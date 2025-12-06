<template>
	<div class="p-[2%]">
		<div class="w-full h-0 pb-[100%] relative">
			<img
				:src="props.src"
				alt="map preview"
				class="object-contain w-full h-full absolute image-rendering-pixelated"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	src: String,
})
</script>
