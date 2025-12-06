<template>
	<el-menu
		router
		mode="horizontal"
		:default-active="
			navRoutes.find((it) => route.path.startsWith(it.path))?.path
		"
	>
		<el-menu-item disabled index="logo" class="cursor-default! opacity-100!">
			<img
				src="~/assets/icons-64.png"
				alt="logo"
				class="h-12 hidden md:block"
			/>
			<span class="text-[22px] font-bold" style="color: dodgerblue"
				>Mindustry 资源站</span
			>
		</el-menu-item>
		<el-menu-item
			v-for="navRoute in navRoutes"
			:key="navRoute.path"
			:index="navRoute.path"
		>
			{{ navRoute.name }}
		</el-menu-item>
		<ClientOnly>
			<el-menu-item
				disabled
				style="margin-left: auto"
				index="user"
				class="cursor-default! opacity-100!"
			>
				<div v-if="userStore.logged">
					Hi {{ userStore.info.name }}
					<el-link :underline="'hover'" @click="userStore.logout">登出</el-link>
				</div>
				<el-link v-else :underline="'hover'" href="/user/login">登录</el-link>
			</el-menu-item>
		</ClientOnly>
	</el-menu>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const route = useRoute()

onBeforeMount(() => {
	userStore.refresh()
})
</script>
