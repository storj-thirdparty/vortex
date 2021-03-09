<style scoped>
h1 {
	color: white;
	text-align: center;
}
.home {
	text-align: center;
	font-size: 18px;
}
</style>

<template>
	<div>
		<h1>{{ title }}</h1>
		<router-link to="/app/browser/"
			><div class="home">Go home.</div></router-link
		>
	</div>
</template>

<script>
export default {
	name: "NotFound",
	props: ["context"],
	computed: {
		title() {
			return `Sorry, this ${this.context || "page"} does not exist.`;
		}
	}
};
</script>
