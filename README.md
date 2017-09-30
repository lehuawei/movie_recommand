<h1>movie_recommand v1.0</h1>
<h3>微信小程序 - 微智能电影推荐 v1.0</h3>
<h2>感恩么么哒</h2>
<ul>
<li>豆瓣api <a href="https://developers.douban.com/">https://developers.douban.com/</a></li>
<li>百度地图 <a href="http://lbsyun.baidu.com/">http://lbsyun.baidu.com/</a></li>
</ul>
<h2>版本主要功能与内容</h2>
<ul>
<li>热映电影板块：导航搜索 导航banner  热映电影信息展示（电影海报、电影类型）</li>
<li>待映电影板块：待映电影信息展示</li>
<li>经典电影板块：经典电影展示</li>
<li>我的：包括用户设置换肤、收藏（人物和电影收藏）、历史记录、相册、信息设置等内容</li>
<li>智能搜索板块：根据用户搜索的电影名称、人物名称、电影类型标签名称，后台返回搜索热度最多的前十名电影标签、前五名类型标签、前五名人物标签</li>
</ul>
<h2>一些说明</h2>
<p>为了学习微信小程序，找了一些项目来学习，在github上看到一关于电影推荐的小程序，很感兴趣，于是就copy下来边学边看，慢慢掌握了小程序的开发，因此
   就自行模拟项目的需求完成并且在此基础上做了修改和升级。


</p>
<h2>核心部分实现日志</h2>
<ul>
<li>UI部分<ul>
<li>确定好整体配色，图标部分通过网络搜索使用、部分通过自己设计制作 。</li>
</ul>
</li>
<li>前端部分<ul>
<li>搭建配置好整个项目</li>
<li>对电影信息、人物信息、标签类型等数据信息请求豆瓣网络资源的封装，以及接口数据请求的封装，提高代码复用性。</li>
<li>编写各个组件：电影信息展示块、消息提示框等。</li>
<li>写好请求数据的各个接口：电影信息、人物信息、搜索等。</li>
<li>编写每个页面 热映、待映、经典等排版及样式。引入写好的组件。</li>
<li>热映部分：引入组件，初始化拿到数据。实现点击海报进入电影详情、点击标签进入对应标签类型电影。</li>
<li>电影详情、人物详情中用户可以收藏电影与人物。收藏的人物和电影存在数据库（不再通过缓存实现）在我的收藏中调取。</li>
<li>用户浏览的历史记录（电影与人物）放在缓存里 在我的历史记录可以看到。</li>
<li>个人中心我的资料部分可以填写用户信息，写入数据库。用户上传的相片以及更换的背景皮肤卡存入数据库</li>
<li>清除缓存：历史记录将会被清除。</li>
<li>搜索部分：根据用户搜索热度，返回热度较高的电影名、人物名、标签名。</li>
<li>定位功能定位用户所在城市</li>
</ul>
</li>
<li>服务端<ul>
<li>采用php 将用户信息、电影与人物的收藏、上传的照片、更换的背景卡以及用户搜索热度的频次写入数据库</li>
</ul>
</li>
<li>数据库<ul>
<li>采用MYSQL数据库，一共有八张表：用户信息表、用户皮肤背景卡表、电影收藏表、人物收藏表、相册表、电影名搜索表、人物名搜索表、标签名搜索表</li>
</ul>
</li>
</ul>
<h2>使用到的技术</h2>
<pre><code>HTML5 CSS3 JavaScript  Es6 PHP MySQL </code></pre>
