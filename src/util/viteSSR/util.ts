//TODO
//渲染内容 htmlParts teleports preload __INITIAL_STATE__

const templateTag = /<!--([a-zA-Z0-9-]+)-->/g

export function injectTemplate(template: string, htmlParts: Record<string, string>) {
    const notInjected = new Set(Object.keys(htmlParts))
    const html = template.replaceAll(templateTag, (raw, token: string) => {
        if (!notInjected.has(token))
            console.warn('Inject html part not found', token)
        notInjected.delete(token)
        return htmlParts[token] || raw
    })
    if (notInjected.size > 0)
        console.warn("Not inject html parts", notInjected)
    return html
}

const UNSAFE_CHARS_REGEXP = /[<>\/\u2028\u2029]/g
const ESCAPED_CHARS = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029',
}

function escapeUnsafeChars(unsafeChar: string) {
    return ESCAPED_CHARS[unsafeChar as keyof typeof ESCAPED_CHARS]
}

export function htmlEscape(input: string) {
    return input.replaceAll(UNSAFE_CHARS_REGEXP, escapeUnsafeChars)
}