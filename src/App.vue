<style scoped>
#app {
	background: #133E9C;
	background: radial-gradient(119.85% 188.21% at 81.22% 25.21%, #133E9C 0%, #000000 100%);
	font-family: 'Inter', sans-serif;
}

.about-tardigrade {
	font-weight: bold;
	font-size: 16px;
	color: #0068DC;
}

@media (max-width: 575.98px) {
	.about-tardigrade {
		font-size: 14px;
	}
}

.navbar {
	z-index: 2;
}

@media only screen and (max-width:991px) {
	.navbar {
		text-align: center;
	}
}

@media only screen and (max-width:991px) {
	.navbar-collapse {
		margin-top: 20px;
	}
}

.navbar-nav .login-link-mobile {
	display: none;
}

@media only screen and (max-width:991px) {
	.navbar-nav {
		text-align: left;
	}

	.navbar-nav .blog-link {
		margin-top: 12px;
	}

	.navbar-nav .login-link {
		display: none;
	}

	.navbar-nav .login-link-mobile {
		display: block;
		text-align: center;
		margin-top: 10px;
	}
}

.navlink {
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 20px;
	color: #fff;
	cursor: pointer;
}

.navlink a {
	color: #fff;
}

.navlink:hover {
	color: #fff;
	text-decoration: underline;
}

@media only screen and (max-width:991px) {
	button.navlink {
		padding: 0;
		margin: 5px 0 20px;
	}
}

.dropdown-item {
	margin: 10px 0;
	font-size: 16px;
}

.dropdown-item:hover {
	background: 0 0;
}

.dropdown-item:hover img {
	display: block;
}

.dropdown-menu {
	font-size: 16px;
	width: 300px
}

@media only screen and (max-width:991px) {
	.dropdown-menu {
		margin: 0 auto;
		margin-bottom: 12px;
	}
}

.dropdown-menu .dropdown-divider {
	width: 85%;
	margin: 10px auto;
	opacity: .5;
	border-top: 1px solid #93a1af;
	margin-left: 24px;
}

@media only screen and (max-width:991px) {
	.dropdown-menu .dropdown-divider {
		width: 43%;
		float: left;
	}
}

.dropdown-menu img {
	float: right;
	position: relative;
	top: 7px;
	display: none;
}

.dropdown-menu .dropdown-header {
	color: #93a1af;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 12px;
	line-height: 16px;
	margin-top: 8px
}

.dropdown-menu .dropdown-header:hover {
	color: #93a1af;
}

.dropdown-menu .dropdown-item {
	font-size: 14px;
}

.dropdown-menu .dropdown-item:hover {
	color: #2582ff;
	font-weight: 700;
}

.navbar-toggler-icon {
	background-image: url(data:image/svg+xml;
 charset=utf8;
	base64,
	PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LCAxKSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTQgOGgyNE00IDE2aDI0TTQgMjRoMjQiLz48L3N2Zz4=) !important
}

.navbar-toggler {
	background-color: transparent !important;
	visibility: visible;
}

@media only screen and (max-width:991px) {
	.navbar-toggler {
		margin-bottom: 17px;
	}
}

.navbar-toggler .exit-icon {
	visibility: hidden;
	display: none;
}

.navbar-toggler[aria-expanded=true] {
	visibility: hidden;
}

.navbar-toggler[aria-expanded=true] .exit-icon {
	visibility: visible;
	display: block;
	position: absolute;
	right: 17px;
	top: 10px;
	width: 18px;
}

.navbar-toggler.bg-light:focus,
.navbar-toggler.bg-light:hover {
	background-color: transparent !important;
}

@media only screen and (max-width:991px) {
	.dropdown-menu.show {
		display: inline;
	}

	.dropdown-menu.show .dropdown-item {
		color: #fff;
	}

	.dropdown-menu.show .dropdown-header {
		color: #93a1af;
		margin-bottom: 0;
		margin-top: 0;
	}

	.dropdown-menu.show .dropdown-icon {
		display: none;
	}
}

.btn-group {
	display: inline;
	position: relative;
	top: 2px;
}

.nav-join {
	border: 2px solid #fff;
	border-radius: 4px;
	color: #fff;
	font-weight: 700;
	font-size: 14px;
	width: 150px;
}

.nav-join:hover {
	color: #2582ff;
	background: #fff;
}

@media only screen and (max-width:991px) {
	.nav-join {
		width: 100%;
	}
}


.second-nav.navbar {
	padding-top: 20px;
	padding-bottom: 10px;
}

.second-nav.navbar .navlink {
	color: #fff;
}

.second-nav.navbar .navlink:hover {
	color: #fff;
	text-decoration: underline;
}

.second-nav.navbar .nav-join {
	color: #fff;
	border: 2px solid #fff;
}

.second-nav.navbar .nav-join:hover {
	color: #2582ff;
}

@media only screen and (max-width:991px) {
	.second-nav.navbar .dropdown-menu .dropdown-item {
		color: #fff;
	}
}

@media only screen and (max-width:991px) {
	.second-nav.navbar .dropdown-menu.show {
		border: none;
	}
}

.second-nav.navbar .navbar-toggler-icon {
	background-image: url(data:image/svg+xml;
 charset=utf8;
	base64,
	PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggc3Ryb2tlPSJyZ2JhKDE0NywxNjEsMTc1LCAxKSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTQgOGgyNE00IDE2aDI0TTQgMjRoMjQiLz48L3N2Zz4=) !important
}

.second-nav.navbar .navbar-toggler[aria-expanded=true] {
	visibility: visible;
}

.second-nav.navbar .logo {
	margin-top: -14px;
	height: 42px;
}


</style>

<template>
<div id="app" v-on:click="handleOpenDropdownClicks">

	<div class="alert alert-warning text-center rounded-0" role="alert">
		Welcome! Please be aware that this is an alpha development version. Data and accounts will be deleted every few days.
	</div>

	<div class="container">
		<div class="row py-3">
			<div class="col">
				<nav class="navbar navbar-expand-sm second-nav p-0">
					<a class="navbar-brand" href="/"><img class="logo" alt="Storj logo" src="@/assets/storj-logo.svg"></a>
					<!--<button class="navbar-toggler navbar-light bg-light" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation"> <span
						 class="navbar-toggler-icon"></span></button>-->
					<!--<div class="collapse navbar-collapse" id="navbarToggler">-->
						<ul class="navbar-nav ml-auto">
							<li class="nav-item mr-3 d-none d-sm-block">
								<a class="nav-link" href="https://storj.io/blog">
									<p class="navlink">Blog</p>
								</a>
							</li>
							<li class="nav-item mr-3 d-none d-sm-block">
								<a class="nav-link" href="https://forum.storj.io/">
									<p class="navlink">Forum</p>
								</a>
							</li>

							<li v-if="this.$store.state.stargateAccessKey" class="nav-item active">
								<button v-on:click="$store.dispatch('logout')" class="btn my-2 my-sm-0 nav-join">Logout</button>
							</li>

							<!--<li class="nav-item active login-link-mobile">
								<a class="nav-link" href="https://tardigrade.io/login">
									<p class="navlink">Sign In <span class="sr-only">(current)</span></p>
								</a>
							</li>-->
						</ul>
					<!--</div>-->
				</nav>
			</div>
		</div>
	</div>

	<router-view></router-view>

</div>
</template>

<script>
export default {
	methods: {
		handleOpenDropdownClicks() {
			if (this.$store.state.openedDropdown) {
				this.$store.dispatch('openDropdown', null);
			}
		},
	},
}
</script>
