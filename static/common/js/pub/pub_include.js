var baseURL = '../../common/';
var include = {
	meta : function(){
		document.write('<meta http-equiv="X-UA-Compatible" content="IE=edge">');
		document.write('<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">');
		document.write('<meta name="keywords" content="">');
		document.write('<meta name="description" content="">');
	},
	styles : function(){
		//document.write('<link rel="stylesheet" href="'+baseURL+'css/import.css" type="text/css">');
		document.write('<link href="'+baseURL+'css/base.css" rel="stylesheet">');
		document.write('<link href="'+baseURL+'css/layout.css" rel="stylesheet">');
		document.write('<link href="'+baseURL+'css/ui.css" rel="stylesheet">');
		document.write('<link href="'+baseURL+'css/content.css" rel="stylesheet">');
		document.write('<link href="'+baseURL+'css/common.css" rel="stylesheet">');
		document.write('<link href="'+baseURL+'css/libs/plugins.css" rel="stylesheet">');
		document.write('<link href="'+baseURL+'css/libs/animate.css" rel="stylesheet">');
	},
	scripts : function(){
		document.write('<script src="'+baseURL+'js/libs/jquery-3.3.1.min.js"></script>');
		document.write('<script src="'+baseURL+'js/pub/pub_device.js"></script>');
		document.write('<script src="'+baseURL+'js/pub/pub_utility.js"></script>');
		document.write('<script src="'+baseURL+'js/pub/pub_ui.js"></script>');
		document.write('<!--[if lt IE 9]>');
		document.write('<script src="'+baseURL+'js/libs/html5shiv-printshiv.js"></script>');
		document.write('<![endif]-->');
	},
	skipNav : function(){
		document.write('	<div class="skipNav">');
		document.write('		<a href="#content">본문 바로가기</a>');
		document.write('	</div>');
	},
	header : function(){
		document.write('	<header class="header">');
		document.write('		<div class="in-sec">');
		document.write('			<div class="logo-area">');
		document.write('				<p class="logo"><a href="#">LOGO</a></p>');
		document.write('			</div>');
		document.write('			<div class="drawer-area">');
		document.write('				<button type="button" class="btn btn-drawer sidebar-opener" aria-controls="sidebar" aria-expanded="false"><span><i class="ico">Sidebar 열기</i></span></button>');
		document.write('			</div>');
		document.write('			<div class="gnb-area">');
		document.write('				<nav class="gnb">');
		document.write('					<div class="node1-menu">');
		document.write('						<ul class="node1-list">');
		document.write('							<li class="node1-item">');
		document.write('								<a href="#" class="node1-link">MENU1</a>');
		document.write('								<div class="node2-menu">');
		document.write('									<ul class="node2-list">');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU11</a></li>');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU12</a></li>');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU13</a></li>');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU14</a></li>');
		document.write('									</ul>');
		document.write('								</div>');
		document.write('							</li>');
		document.write('							<li class="node1-item">');
		document.write('								<a href="#" class="node1-link">MENU2</a>');
		document.write('								<div class="node2-menu">');
		document.write('									<ul class="node2-list">');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU21</a></li>');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU22</a></li>');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU23</a></li>');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU24</a></li>');
		document.write('									</ul>');
		document.write('								</div>');
		document.write('							</li>');
		document.write('							<li class="node1-item">');
		document.write('								<a href="#" class="node1-link">MENU3</a>');
		document.write('								<div class="node2-menu">');
		document.write('									<ul class="node2-list">');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU31</a></li>');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU32</a></li>');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU33</a></li>');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU34</a></li>');
		document.write('									</ul>');
		document.write('								</div>');
		document.write('							</li>');
		document.write('							<li class="node1-item">');
		document.write('								<a href="#" class="node1-link">MENU4</a>');
		document.write('								<div class="node2-menu">');
		document.write('									<ul class="node2-list">');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU41</a></li>');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU42</a></li>');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU43</a></li>');
		document.write('										<li class="node2-item"><a href="#" class="node2-link">MENU44</a></li>');
		document.write('									</ul>');
		document.write('								</div>');
		document.write('							</li>');
		document.write('						</ul>');
		document.write('					</div>');
		document.write('				</nav>');
		document.write('				<script type="text/javascript">$(function(){ ui.gnb.set(0, 0)})</script>');
		document.write('			</div>');
		document.write('		</div>');
		document.write('	</header>');
	},
	sidebar: function(){
		document.write('	<!-- Aside -->');
		document.write('	<aside id="sidebar" class="sidebar">');
		document.write('		<div class="sidebar-header">');
		document.write('			<h1 class="title">Sidebar</h1>');
		document.write('		</div>');
		document.write('		<div class="sidebar-container">');
		document.write('			<nav class="sidebar-nav">');
		document.write('				<div class="node1-menu">');
		document.write('					<ul class="node1-list">');
		document.write('						<li class="node1-item">');
		document.write('							<a href="#" class="node1-link">Menu1</a>');
		document.write('							<div class="node2-menu">');
		document.write('								<ul class="node2-list">');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu11</a></li>');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu12</a></li>');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu13</a></li>');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu14</a></li>');
		document.write('								</ul>');
		document.write('							</div>');
		document.write('						</li>');
		document.write('						<li class="node1-item">');
		document.write('							<a href="#" class="node1-link">Menu2</a>');
		document.write('							<div class="node2-menu">');
		document.write('								<ul class="node2-list">');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu21</a></li>');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu22</a></li>');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu23</a></li>');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu24</a></li>');
		document.write('								</ul>');
		document.write('							</div>');
		document.write('						</li>');
		document.write('						<li class="node1-item">');
		document.write('							<a href="#" class="node1-link">Menu3</a>');
		document.write('							<div class="node2-menu">');
		document.write('								<ul class="node2-list">');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu31</a></li>');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu32</a></li>');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu33</a></li>');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu34</a></li>');
		document.write('								</ul>');
		document.write('							</div>');
		document.write('						</li>');
		document.write('						<li class="node1-item">');
		document.write('							<a href="#" class="node1-link">Menu4</a>');
		document.write('							<div class="node2-menu">');
		document.write('								<ul class="node2-list">');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu41</a></li>');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu42</a></li>');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu43</a></li>');
		document.write('									<li class="node2-item"><a href="#" class="node2-link">Menu44</a></li>');
		document.write('								</ul>');
		document.write('							</div>');
		document.write('						</li>');
		document.write('					</ul>');
		document.write('				</div>');
		document.write('			</nav>');
		document.write('		</div>');
		document.write('		<button type="button" class="btn btn-drawer sidebar-closer" aria-controls="sidebar" aria-expanded="true" onclick="ui.sidebar(\'sidebar\', \'close\');"><span>Sidebar 닫기</span></button>');
		document.write('	</aside>');
		document.write('	<!-- //Aside -->');
	},
	footer : function(){
		document.write('    <footer class="footer">Footer</footer>');
	},
	guideHeader : function(){
		document.write('	<header class="header">');
		document.write('		<div class="in-sec">');
		document.write('			<div class="logo-area">');
		document.write('				<p class="logo"><a href="_prototype.html">UI Librarys</a></p>');
		document.write('			</div>');
		document.write('			<div class="drawer-area">');
		document.write('				<button type="button" class="btn btn-drawer sidebar-opener" aria-controls="sidebar" aria-expanded="false"><span><i class="ico">Sidebar 열기</i></span></button>');
		document.write('			</div>');
		document.write('			<div class="gnb-area">');
		document.write('				<nav class="gnb">');
		document.write('					<div class="node1-menu">');
		document.write('						<ul class="node1-list">');
		document.write('							<li class="node1-item">');
		document.write('								<a href="#" class="node1-link">Prototype</a>');
		document.write('								<div class="node2-menu">');
		document.write('									<ul class="node2-list">');
		document.write('										<li class="node2-item"><a href="../_layout/_prototype_layout.html" target="_blank" title="새창열림" class="node2-link">Layout</a></li>');
		document.write('										<li class="node2-item"><a href="_prototype.html" class="node2-link">Guide</a></li>');
		document.write('									</ul>');
		document.write('								</div>');
		document.write('							</li>');
		document.write('							<li class="node1-item">');
		document.write('								<a href="#" class="node1-link">General</a>');
		document.write('								<div class="node2-menu">');
		document.write('									<ul class="node2-list">');
		document.write('										<li class="node2-item"><a href="fonts.html" class="node2-link">Fonts</a></li>');
		document.write('										<li class="node2-item"><a href="colors.html" class="node2-link">Color</a></li>');
		document.write('										<li class="node2-item"><a href="grids.html" class="node2-link">Grids</a></li>');
		document.write('									</ul>');
		document.write('								</div>');
		document.write('							</li>');
		document.write('							<li class="node1-item">');
		document.write('								<a href="#" class="node1-link">Inline</a>');
		document.write('								<div class="node2-menu">');
		document.write('									<ul class="node2-list">');
		document.write('										<li class="node2-item"><a href="buttons.html" class="node2-link">Buttons</a></li>');
		document.write('										<li class="node2-item"><a href="form_elements.html" class="node2-link">Form 요소</a></li>');
		document.write('										<li class="node2-item"><a href="form_group.html" class="node2-link">Form 그룹</a></li>');
		document.write('										<li class="node2-item"><a href="form_mixins.html" class="node2-link">Form 상세</a></li>');
		document.write('										<li class="node2-item"><a href="icons.html" class="node2-link">Icons</a></li>');
		document.write('										<li class="node2-item"><a href="labels.html" class="node2-link">Labels</a></li>');
		document.write('										<li class="node2-item"><a href="badges.html" class="node2-link">Badges</a></li>');
		document.write('										<li class="node2-item"><a href="thumnails.html" class="node2-link">Thumnails</a></li>');
		document.write('										<li class="node2-item"><a href="bullets.html" class="node2-link">Bullets</a></li>');
		document.write('									</ul>');
		document.write('								</div>');
		document.write('							</li>');
		document.write('							<li class="node1-item">');
		document.write('								<a href="#" class="node1-link">Block</a>');
		document.write('								<div class="node2-menu">');
		document.write('									<ul class="node2-list">');
		document.write('										<li class="node2-item"><a href="boxs.html" class="node2-link">Boxs</a></li>');
		document.write('										<li class="node2-item"><a href="cards.html" class="node2-link">Cards</a></li>');
		document.write('										<li class="node2-item"><a href="panels.html" class="node2-link">Panels</a></li>');
		document.write('										<li class="node2-item"><a href="steps.html" class="node2-link">Steps</a></li>');
		document.write('										<li class="node2-item"><a href="lists.html" class="node2-link">Lists</a></li>');
		document.write('										<li class="node2-item"><a href="tables.html" class="node2-link">Tables</a></li>');
		document.write('										<li class="node2-item"><a href="paginations.html" class="node2-link">Paginations</a></li>');
		document.write('									</ul>');
		document.write('								</div>');
		document.write('							</li>');
		document.write('							<li class="node1-item">');
		document.write('								<a href="#" class="node1-link">Jquery</a>');
		document.write('								<div class="node2-menu">');
		document.write('									<ul class="node2-list">');
		document.write('										<li class="node2-item"><a href="tabs.html" class="node2-link">Tabs</a></li>');
		document.write('										<li class="node2-item"><a href="accordions.html" class="node2-link">Accordions</a></li>');
		document.write('										<li class="node2-item"><a href="dropmenus.html" class="node2-link">Dropmenus</a></li>');
		document.write('										<li class="node2-item"><a href="tooltips.html" class="node2-link">Tooltips</a></li>');
		document.write('										<li class="node2-item"><a href="folders.html" class="node2-link">Folder</a></li>');
		document.write('										<li class="node2-item"><a href="layers.html" class="node2-link">Layers</a></li>');
		document.write('										<li class="node2-item"><a href="popups.html" class="node2-link">Popup</a></li>');
		document.write('									</ul>');
		document.write('								</div>');
		document.write('							</li>');
		document.write('						</ul>');
		document.write('					</div>');
		document.write('				</nav>');
		document.write('			</div>');
		document.write('		</div>');
		document.write('	</header>');

	},
}