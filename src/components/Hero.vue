<style>
@media only screen and (min-width: 768px) {
	.mascot {
		position: absolute;
		bottom: 0;
	}
}
</style>

<template>
	<div class="hero">
		<!-- <router-view></router-view> -->

		<duplicati-hero v-if="checkPath() === 'duplicati'"></duplicati-hero>
		<home-hero v-else></home-hero>

		<!-- <img src="@/assets/mascot.png" alt="Mascot" class="w-100 mt-4 mascot"> -->
	</div>
</template>

<script>
import HomeHero from './HomeHero';
import DuplicatiHero from './DuplicatiHero';

export default {
	name: 'Hero',
	components: { HomeHero, DuplicatiHero },
	methods: {
		checkPath() {
			const query = this.$route.query;
			let result = 'home';
			if (query.app) result = query.app;
			return result;
		},
	}
}
</script>
