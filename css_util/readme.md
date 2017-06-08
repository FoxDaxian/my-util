> 改变大小从12px开始，其中util.scss中的em函数的参数传几，得到的就是接近于该值的数  
> 改变颜色和改变大小只需要为以 ***icon_*** 开头的类设置font-size,color即可  

使用方法  
首先下载下来，这个图标库，使用```scss```编写，所以您需要会使用```scss```编译，例如```koala```或者```webpack```、```gulp```等  

----

html方面：  
```html
<!-- 其中 外层div为控制的间接层（方便控制图标大小，位置等），内部的div为真正的图标-->
<!-- 鼠标hover以查看图标类名 -->
<div class="yourClassName"><div class="icon_chooseOne"></div></div>
```


css方面：
```css
<!-- 可以自定义图标大小、颜色以及hover样式,例如 -->
.icon_chooseOne{
    font-size: 16px;
    color:green;
}
.icon_chooseOne:hover{
    font-size: 20px;
    color:red;
}
```

[预览](https://a13821190779.github.io/icon/index.html)