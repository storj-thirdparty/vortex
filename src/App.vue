<style scoped>
	#app {
		background: #F7F8FB;
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

	.navbar{
	    z-index:2
	}
	@media only screen and (max-width:991px){
	    .navbar{
	        text-align:center
	    }
	}
	@media only screen and (max-width:991px){
	    .navbar-collapse{
	        margin-top:20px
	    }
	}
	.navbar-nav .login-link-mobile{
	    display:none
	}
	@media only screen and (max-width:991px){
	    .navbar-nav{
	        text-align:left
	    }
	    .navbar-nav .blog-link{
	        margin-top:12px
	    }
	    .navbar-nav .login-link{
	        display:none
	    }
	    .navbar-nav .login-link-mobile{
	        display:block;
	        text-align:center;
	        margin-top:10px
	    }
	}
	.navlink{
	    font-style:normal;
	    font-weight:500;
	    font-size:16px;
	    line-height:20px;
	    color:#fff;
	    cursor:pointer
	}
	.navlink a{
	    color:#fff
	}
	.navlink:hover{
	    color:#fff;
	    text-stroke:1px #fff;
	    -webkit-text-stroke:1px #fff
	}
	@media only screen and (max-width:991px){
	    button.navlink{
	        padding:0;
	        margin:5px 0 20px
	    }
	}
	.dropdown-item{
	    margin:10px 0;
	    font-size:16px
	}
	.dropdown-item:hover{
	    background:0 0
	}
	.dropdown-item:hover img{
	    display:block
	}
	.dropdown-menu{
	    font-size:16px;
	    width:300px
	}
	@media only screen and (max-width:991px){
	    .dropdown-menu{
	        margin:0 auto;
	        margin-bottom:12px
	    }
	}
	.dropdown-menu .dropdown-divider{
	    width:85%;
	    margin:10px auto;
	    opacity:.5;
	    border-top:1px solid #93a1af;
	    margin-left:24px
	}
	@media only screen and (max-width:991px){
	    .dropdown-menu .dropdown-divider{
	        width:43%;
	        float:left
	    }
	}
	.dropdown-menu img{
	    float:right;
	    position:relative;
	    top:7px;
	    display:none
	}
	.dropdown-menu .dropdown-header{
	    color:#93a1af;
	    font-weight:700;
	    text-transform:uppercase;
	    letter-spacing:1px;
	    font-size:12px;
	    line-height:16px;
	    margin-top:8px
	}
	.dropdown-menu .dropdown-header:hover{
	    color:#93a1af
	}
	.dropdown-menu .dropdown-item{
	    font-size:14px
	}
	.dropdown-menu .dropdown-item:hover{
	    color:#2582ff;
	    font-weight:700
	}
	.navbar-toggler-icon{
	    background-image:url(data:image/svg+xml;
	    charset=utf8;
	    base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LCAxKSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTQgOGgyNE00IDE2aDI0TTQgMjRoMjQiLz48L3N2Zz4=)!important
	}
	.navbar-toggler{
	    background-color:transparent!important;
	    visibility:visible
	}
	@media only screen and (max-width:991px){
	    .navbar-toggler{
	        margin-bottom:17px
	    }
	}
	.navbar-toggler .exit-icon{
	    visibility:hidden;
	    display:none
	}
	.navbar-toggler[aria-expanded=true]{
	    visibility:hidden
	}
	.navbar-toggler[aria-expanded=true] .exit-icon{
	    visibility:visible;
	    display:block;
	    position:absolute;
	    right:17px;
	    top:10px;
	    width:18px
	}
	.navbar-toggler.bg-light:focus,.navbar-toggler.bg-light:hover{
	    background-color:transparent!important
	}
	@media only screen and (max-width:991px){
	    .dropdown-menu.show{
	        display:inline
	    }
	    .dropdown-menu.show .dropdown-item{
	        color:#fff
	    }
	    .dropdown-menu.show .dropdown-header{
	        color:#93a1af;
	        margin-bottom:0;
	        margin-top:0
	    }
	    .dropdown-menu.show .dropdown-icon{
	        display:none
	    }
	}
	.btn-group{
	    display:inline;
	    position:relative;
	    top:2px
	}
	.nav-join{
	    border:2px solid #fff;
	    border-radius:4px;
	    color:#fff;
	    font-weight:700;
	    font-size:14px;
	    width:150px
	}
	.nav-join:hover{
	    color:#2582ff;
	    background:#fff
	}
	@media only screen and (max-width:991px){
	    .nav-join{
	        width:100%
	    }
	}


	.second-nav.navbar{
	    padding-top:20px;
	    padding-bottom:10px
	}
	.second-nav.navbar .navlink{
	    color:#93a1af
	}
	.second-nav.navbar .navlink:hover{
	    color: #93a1af;
			text-stroke: 1px #93a1af;
	    -webkit-text-stroke: 1px #93a1af;
	}
	/* .second-nav.navbar .navlink:active{
	    font-weight:700
	} */
	.second-nav.navbar .nav-join{
	    color:#2582ff;
	    border:2px solid #2582ff
	}
	@media only screen and (max-width:991px){
	    .second-nav.navbar .dropdown-menu .dropdown-item{
	        color:#93a1af
	    }
	}
	@media only screen and (max-width:991px){
	    .second-nav.navbar .dropdown-menu.show{
	        border:none
	    }
	}
	.second-nav.navbar .navbar-toggler-icon{
	    background-image:url(data:image/svg+xml;
	    charset=utf8;
	    base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggc3Ryb2tlPSJyZ2JhKDE0NywxNjEsMTc1LCAxKSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTQgOGgyNE00IDE2aDI0TTQgMjRoMjQiLz48L3N2Zz4=)!important
	}
	.second-nav.navbar .navbar-toggler[aria-expanded=true]{
	    visibility:visible
	}
	.second-nav.navbar .logo{
	    margin-top:-14px;
	    height:21px
	}

	footer{
	    background:#071a33;
	    z-index:0;
	    position:relative
	}
	.footer{
	    padding-top:3.5em;
	    background-size:cover;
	    text-align:left
	}
	.footer .response{
	    color:#fff
	}
	.footer__logo-img{
	    width:100%;
	    height:auto
	}
	.footer .list-unstyled{
	    list-style-type:none;
	    padding-left:0;
	    width:130px
	}
	.footer .list-unstyled span{
	    line-height:28px;
	    font-weight:300;
	    font-size:13px;
	    opacity:.7
	}
	.footer__link{
	    color:#fff;
	    font-family:Poppins;
	    font-size:12px;
	    line-height:28px;
	    opacity:.4;
	    font-weight:300
	}
	.footer__link-temp{
	    opacity:1;
	    color:#2582ff
	}
	.footer__link:hover{
	    opacity:1;
	    color:#2582ff
	}
	.footer__link:hover .footer__link-text{
	    opacity:1
	}
	.footer__link-img{
	    height:22px;
	    width:22px;
	    padding:4px;
	    margin-right:.6rem
	}
	.footer__content h5{
	    font-size:12px;
	    line-height:40px
	}
	.footer__content-address{
	    font-weight:300;
	    font-size:13px;
	    line-height:28px;
	    color:#fff;
	    opacity:.4
	}
	.footer__content-address span{
	    font-size:13px;
	    font-weight:300;
	    opacity:.7
	}
	.footer__email-input{
	    display:block;
	    background:#fbfbfb;
	    border:1px solid #eee;
	    border-radius:4px 4px 0 0;
	    color:#9ca3ad;
	    padding:12px 18px 10px;
	    width:100%;
	    max-width:320px;
	    font-size:16px;
	    -webkit-transition:all .15s ease-in-out;
	    -moz-transition:all .15s ease-in-out;
	    -ms-transition:all .15s ease-in-out;
	    transition:all .15s ease-in-out;
	    height:50%;
	    font-size:12px;
	}
	.footer__email-input:focus{
	    outline:0;
	    border-color:#2d86fb
	}
	.footer__btn-submit{
	    font-weight:800;
	    background:#2683ff;
	    color:#fff;
	    border-radius:0 0 4px 4px;
	    font-size:16px;
	    padding:12px 16px;
	    width:100%;
	    max-width:320px;
	    border:0;
	    z-index:2;
	    outline:0;
	    -webkit-backface-visibility:hidden;
	    -moz-osx-font-smoothing:grayscale;
	    -webkit-transition:all .15s ease-in-out;
	    -moz-transition:all .15s ease-in-out;
	    -ms-transition:all .15s ease-in-out;
	    transition:all .15s ease-in-out;
	    height:50%;
	    font-size:12px;
	    font-family:Poppins
	}
	.footer .footer__content h5{
	    margin-bottom:0
	}
	.footer .footer-message{
	    color:#fff;
	    font-size:12px;
	    line-height:15px;
	    margin-bottom:10px
	}
	.footer .social-section{
	    float:right;
	    padding-left:0
	}
	.footer .social-section .footer-social{
	    display:inline
	}
	.footer .social-section .footer-social .footer__link{
	    opacity:.8
	}
	.footer .social-section .footer-social .footer__link:hover{
	    opacity:1
	}
	.footer .social-section .footer-social .social-link{
	    opacity:1;
	    margin:auto 15px
	}
	@media(max-width:1024px){
	    .footer .social-section .footer-social .social-link{
	        margin:auto 8px
	    }
	}
	@media(max-width:768px){
	    .footer .social-section .footer-social .social-link{
	        margin:auto 15px;
	        margin-top:25px
	    }
	}
	#mce-error-response-newsletter,#mce-success-response-newsletter{
	    display:none;
	    font-size:12px;
	    line-height:15px;
	    margin-top:10px
	}
	@media(max-width:991px){
	    .footer__logo-img{
	        margin-bottom:30px;
	        width:inherit;
	        height:auto
	    }
	    .footer__link{
	        line-height:32px
	    }
	}
	@media(min-width:874px) and (max-width:991px){
	    .footer__content-item-btn{
	        width:400px
	    }
	}
	@media(max-width:767px){
	    .footer__logo-img{
	        width:125px;
	        height:auto
	    }
	}

</style>

<template>
	<div id="app">

		<div class="container">
			<div class="row py-3">
				<div class="col">
					<nav class="navbar navbar-expand-lg second-nav p-0">
						<a class="navbar-brand" href="/"><img class="logo" alt="Tardigrade logo" src="@/assets/tardigrade.svg"></a>
						<button class="navbar-toggler navbar-light bg-light" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span></button>
						<div class="collapse navbar-collapse" id="navbarToggler">
							<ul class="navbar-nav ml-auto">
								<li class="btn-group nav-item mr-3 active">
									<button type="button" class="navlink btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Developers <span class="sr-only">(current)</span></button>
									<div class="dropdown-menu">
										<p class="dropdown-header" href="#">For Developers</p>
										<div class="dropdown-divider"></div>
											<a class="dropdown-item" href="https://documentation.tardigrade.io/">Docs<img class="dropdown-icon" src="@/assets/blue-carrot.svg" height="13" width="13"></a>
											<a class="dropdown-item" href="https://tardigrade.io/connectors">Connectors<img class="dropdown-icon" src="@/assets/blue-carrot.svg" height="13" width="13"></a>
											<a class="dropdown-item" href="https://tardigrade.io/community/">Community<img src="@/assets/blue-carrot.svg" height="13" width="13"></a>
											<a class="dropdown-item" href="https://support.tardigrade.io/hc/en-us">Support<img class="dropdown-icon" src="@/assets/blue-carrot.svg" height="13" width="13"></a></div>
								</li>
								<li class="btn-group nav-item mr-3 active">
									<button id="partnerButton" type="button" class="navlink btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Partners <span class="sr-only">(current)</span></button>
									<div class="dropdown-menu">
										<p class="dropdown-header" href="#">Our Partners</p>
										<div class="dropdown-divider"></div>
										<a class="dropdown-item" href="https://tardigrade.io/partner">Open Source Partners<img class="dropdown-icon" src="@/assets/blue-carrot.svg" height="13" width="13"></a>
										<a class="dropdown-item" href="https://tardigrade.io/tech-partner">Technology Partners<img class="dropdown-icon" src="@/assets/blue-carrot.svg" height="13" width="13"></a>
									</div>
								</li>
								<li class="nav-item mr-3 active">
									<a class="nav-link" href="https://support.tardigrade.io/hc/en-us">
										<p class="navlink">Support <span class="sr-only">(current)</span></p>
									</a>
								</li>
							</ul>
							<ul class="navbar-nav ml-auto">
								<li class="nav-item mr-3 active">
									<a class="nav-link login-link" href="https://tardigrade.io/login">
										<!--<p class="navlink">Sign In <span class="sr-only">(current)</span></p>-->
									</a>
								</li>
								<li class="nav-item active"><a href="https://tardigrade.io/signup" class="btn my-2 my-sm-0 nav-join">Login</a></li>
								<li class="nav-item active login-link-mobile">
									<a class="nav-link" href="https://tardigrade.io/login">
										<p class="navlink">Sign In <span class="sr-only">(current)</span></p>
									</a>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</div>

		<router-view></router-view>

		<footer>
			<div class="footer container">
				<div class="footer__content row">
					<div class="footer__content-item col-sm-12 col-md-12 col-lg-2 mt-2">
						<a href="/" class="footer__logo"><img class="footer__logo-img img-fluid" src="@/assets/tar-logo-blue-horizontal.svg" alt="Tardigrade.io"></a>
					</div>
					<div class="footer__content-item offset-lg-1 col-6 col-sm-6 col-md-6 col-lg-3">
						<h5 class="text-white">Legal</h5>
						<ul class="list-unstyled">
							<li><a class="footer__link" href="https://tardigrade.io/terms-of-service">Terms of Service</a></li>
							<li><a class="footer__link" href="https://storj.io/privacy-policy/">Privacy Policy</a></li>
						</ul>
					</div>
					<div class="footer__content-item col-6 col-sm-6 col-md-6 col-lg-3">
						<h5 class="text-white">Resources</h5>
						<ul class="list-unstyled">
							<li><a class="footer__link" href="https://documentation.tardigrade.io/">Docs</a></li>
							<li><a class="footer__link" href="https://tardigrade.io/community/">Community</a></li>
							<li><a class="footer__link" href="https://tardigrade.io/partners/">Partners</a></li>
							<li><a class="footer__link" href="https://support.tardigrade.io/hc/en-us">Support</a></li>
						</ul>
					</div>
					<div class="footer__content-item col-6 col-sm-6 col-md-6 col-lg-3">
						<h5 class="text-white">Company</h5>
						<ul class="list-unstyled">
							<li><a class="footer__link" href="https://tardigrade.io/how-it-works">How it Works</a></li>
							<li><a class="footer__link" href="https://tardigrade.io/about-us">About Us</a></li>
							<li><a class="footer__link" href="https://tardigrade.io/whats-a-tardigrade">What's a Tardigrade?</a></li>
							<li><a class="footer__link" href="https://tardigrade.io/press-kit">Press</a></li>
						</ul>
					</div>
					<!-- <div class="footer__content-item footer__content-item-btn col-6 col-md-6 col-lg-3">
						<h5 class="text-white">Stay in Touch</h5>
						<p class="footer-message text-muted">For the best experience, disable ad blockers and use Chrome or Edge.</p>
						<div id="mc_embed_signup">
							<form rel="noopener noreferrer" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate="">
								<div id="mc_embed_signup_scroll">
									<input class="footer__email-input" type="email" name="EMAIL" id="mce-EMAIL-newsletter" placeholder="Email Address" required="">
									<input class="footer__btn-submit btn-signup" type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe-footer">
									<div id="mce-responses" class="clear">
										<div class="response" id="mce-error-response-newsletter">The email address you provided is not valid!</div>
										<div class="response" id="mce-success-response-newsletter">Thank you for subscribing!</div>
									</div>
								</div>
							</form>
						</div>
					</div> -->
				</div>
				<div class="footer__content py-5">
					<div class="row">
						<div class="col-12 storj-logo">
							<a href="https://storj.io"><img class="footer__link" src="@/assets/storj-labs-logo-footer.svg" alt=""></a>
						</div>
					</div>
					<div class="row mt-4">
						<div class="col-12 col-sm-12 col-md-8 col-lg-8"><address class="footer__content-address">© 2020 Storj Labs Inc. - 3423 Piedmont Road NE, Suite 475, Atlanta, Georgia, 30305, United States</address></div>
						<div class="col-12 col-sm-12 col-md-12 col-lg-4">
							<ul class="social-section">
								<li class="footer-social">
									<a rel="noopener noreferrer" class="footer__link" href="https://twitter.com/storjproject" target="_blank"><img class="social-link" src="@/assets/twitter-footer.svg" alt=""></a>
								</li>
								<li class="footer-social">
									<a rel="noopener noreferrer" class="footer__link" href="https://github.com/Storj/" target="_blank"><img class="social-link" src="@/assets/github-footer.svg" alt=""></a>
								</li>
								<li class="footer-social">
									<a rel="noopener noreferrer" class="footer__link" href="https://www.reddit.com/r/storj/" target="_blank"><img class="social-link" src="@/assets/reddit-footer.svg" alt=""></a>
								</li>
								<li class="footer-social">
									<a rel="noopener noreferrer" class="footer__link" href="https://www.facebook.com/storjproject" target="_blank"><img class="social-link" src="@/assets/facebook-footer.svg" alt=""></a>
								</li>
								<li class="footer-social">
									<a rel="noopener noreferrer" class="footer__link" href="https://medium.com/@storjproject" target="_blank"><img class="social-link" src="@/assets/medium-footer.svg" alt=""></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>

	</div>
</template>
