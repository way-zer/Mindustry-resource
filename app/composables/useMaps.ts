import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/vue-query"
import { MapApi } from "~/backendApi/maps"

// 1. 专门负责“读”的 Composable
export const useMapsList = () => {
	const searchKey = useRouteQuery<string | string[], string>("q", [], {
		transform: { get: (it) => it?.toString() ?? "", set: (v) => v || [] },
	})

	const query = useInfiniteQuery({
		queryKey: ["maps", searchKey],
		queryFn: ({ pageParam }) => MapApi.list(pageParam.begin, searchKey.value),
		initialPageParam: { begin: 0 },
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length < 15) return undefined
			return { begin: allPages.flat().length }
		},
		staleTime: 1000 * 60 * 5,
	})
	const maps = computed(() => query.data.value?.pages.flat() ?? [])

	return {
		searchKey,
		data: maps,
		query,
	}
}

// 2. 专门负责“写”的 Composable
export const useMapsActions = () => {
	const queryClient = useQueryClient()

	const deleteMutation = useMutation({
		mutationFn: (thread: string) => MapApi.deleteThread(thread),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["maps"] })
		},
	})

	return {
		deleteMutation,
	}
}
