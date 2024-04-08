function queryBox() {
    var box = document.querySelector(".box")
    console.log("main.js 里 的 queryBox 输出 ", box);
}

// img.onload = function(){ ... }
// 给 window 
window.onload = function () {
    console.log("所有元素都渲染完成了")
    // 现在我们可以去获取  BOX 元素的 DOM 节点了
    // queryBox()
    app_init();
    // 雪花可以上场景了，
    
}

//实现旋转
var rotateval=0// 旋转角度
var Interval //定时器
function rotate(){
    Interval=setInterval(function(){
        // var img=document.getElementById('img');
        var boy2 = $(".sence2 .boy")
        rotateval+=10;
        boy2.style.transform='rotate('+rotateval+'deg)'
        boy2.style.transition = '0.01s linear'
    },0.01)
}



///////////////////////////
// 封装动画-时间间隔控制 
function doAnimation(time) {
    return new Promise(function (resolve) {
        // 定时器开启
        setTimeout(function () {
            // 标记完成
            console.log(time, " 完成")
            resolve()
        }, time);
    })
}

// 角色的走路效果
function boy_move(boy, pos_start, pos_end) {
    // 动画
    // 5 帧 
    var start = pos_start || 0;
    var end = pos_end || - 400
    var offset = start;
    return setInterval(function () {
        offset -= 100
        if (offset < end) {
            offset = start
        }
        boy.style["background-position-x"] = `${offset}%`
    }, 100);
}

// 角色的换衣效果
function boy_takeoff(boy) {
    // 5 帧 
    var offset = -500;
    var mytime = setInterval(function () {
        offset -= 100
        if (offset < -900) {
            // 停止 定时器
            clearInterval(mytime)
            offset = -1000
        }
        boy.style["background-position-x"] = `${offset}%`
    }, 500);
}

// 获取 DOM 节点
function $(cssstr) {
    return document.querySelector(cssstr)
}


// 相当于等待页面的显示完成后再开始平移
function app_init() {
    var el = $(".sence1 .wrapper")
    var boy1 = $(".sence1 .boy")
    var scence1 = $(".sence1")
    var scence2 = $(".sence2")
    var boy2 = $(".sence2 .boy")
    var girl = $(".sence2 .girl")
    var boy2_el = $(".sence2 .boy-wrapper")
    var girl_el = $(".sence2 .girl-wrapper")

    // 男1 男2，女 定时器
    var boy1_time = null
    var boy2_time = null
    var girl_time = null

    doAnimation(1000)
        // 1 从 外面 走路到 楼梯前
        .then(function () {
            // 开始平移
            console.log(el, "元素");
            el.style.transition = "all 10s linear"
            el.style.left = "766px";
            boy1_time = boy_move(boy1)
            console.log("平移完成了???  -- 没有 ")  // 这里还没有完成哦

            return doAnimation(10001) // 3001 平移过渡所需要的时间
        })
        // 2 上楼梯
        .then(function () {
            console.log("平移完成了 ---  ")
            // 可以上楼梯了
            el.style.transition = "all 1s linear"
            el.style.top = "750px"
            el.style.left = "820px"
            return doAnimation(1000)
        })
        // 3 停止走路-换衣服 动画
        .then(function () {
            // 停止走路
            clearInterval(boy1_time)
            boy1.style["background-position-x"] = "-400%"
            // 去掉外套
            boy_takeoff(boy1)

            return doAnimation(3000)
        })
        // 4 场景淡出
        .then(function () {
            //显示按钮
            $(".anniu").style.display = "block"
        })
        
}

/* */
function btn(){
    var el = $(".sence1 .wrapper")
    var boy1 = $(".sence1 .boy")
    var scence1 = $(".sence1")
    var scence2 = $(".sence2")
    var boy2 = $(".sence2 .boy")
    var girl = $(".sence2 .girl")
    var boy2_el = $(".sence2 .boy-wrapper")
    var girl_el = $(".sence2 .girl-wrapper")

    // 男1 男2，女 定时器
    var boy1_time = null
    var boy2_time = null
    var girl_time = null
    // 进房子
    // 切换场景
    scence1.style.transition = "opacity 1s linear"
    // 淡出
    scence1.style.opacity = 0;
    scence2.style["display"] = "block"
    return doAnimation(1000)


    // 5 切换场景 从场景1 到场景2 
    .then(function () {
        scence1.style["display"] = "none"
        var bd = document.querySelector("body")
        

        bd.style.background = "linear-gradient(45deg, #ee817f, #f19997)"

        // 淡入
        scence2.style.transition = "opacity 2s linear"
        scence2.style.opacity = 1;
        boy2.style.backgroundPositionX = "-1000%"
        // girl.style.backgroundPositionX = ""
        return doAnimation(2000)
    })


    
    // 6 女角色 放下书本的动画 
    .then(function () {
        // 女孩子 放下书，
        girl_time = boy_move(girl, 0, -400)
        return doAnimation(500)
    })
    // 7 2个角色 会面
    .then(function () {
        clearInterval(girl_time)
        girl_time = boy_move(girl, -500, -1100)
        // 平移角色
        // 目标位置 
        
        boy2_el.style.left = "180px"
        girl_el.style.left = "220px"
        boy2_time = boy_move(boy2, -1000, -1200)

        // 男孩子的走路
        return doAnimation(2000)
    })
    // 8 停掉走路效果
    .then(function () {
        // 停掉走路效果
        clearInterval(boy2_time)
        clearInterval(girl_time)
        return doAnimation(1000)
    })
    // 9 角色换位置 -D7
    .then(function () {
        // boy 移动到240px的位置
        boy2_el.style.transition = "left 2s linear"
        boy2_time = boy_move(boy2, -1000, -1200)
        boy2_el.style.left = "240px"
        return doAnimation(2000)
    })
    // 10 -D7
    .then(function () {
        clearInterval(boy2_time)
        // 确保角色是站着而不是走着
        boy2.style["backgroun-position-x"] = "-1000%"
        // 把角色的脸朝向取180度的变换
        boy2.style.transform = "none";
        return doAnimation(100)
    })
    // 11 -控制 女角色的位置 -D7
    .then(function () {
        girl_el.style.transition = "left 1s linear"
        girl_time = boy_move(girl, -1000, -1600)
        return doAnimation(1000)
    })
    // 12 -控制女角色的方向 D7
    .then(function () {
        girl.style.transform = "none"
        clearInterval(girl_time)
        // 需要在清掉计时器后再改，不然定时器时面的代码会修改 backgroundPositionX
        girl.style.backgroundPositionX = "-2000%"

        girl_el.style.transition = "left 2s linear"
        girl_el.style.left = "230px"
        // 男角色 手的位置调整 -D7boy2.style.backgroundPositionX = "-1300%"
        // 控制 另一张图显示出来
        $("#hide").style.display = "block"

        return doAnimation(2000)
    })
    .then(function () {
        $(".chatBox2").style.display = "block"     
        return doAnimation(1000)
    })
    // 13 显示跳动的心
    .then(function () {
        $(".heart-box").style.display = "block"
    })
}








// --------------------分割线----------------------------------------------------------------

function btn2(){
    var el = $(".sence1 .wrapper")
    var boy1 = $(".sence1 .boy")
    var scence1 = $(".sence1")
    var scence2 = $(".sence2")
    var boy2 = $(".sence2 .boy")
    var girl = $(".sence2 .girl")
    var boy2_el = $(".sence2 .boy-wrapper")
    var girl_el = $(".sence2 .girl-wrapper")

    // 男1 男2，女 定时器
    var boy1_time = null
    var boy2_time = null
    var girl_time = null
    // 进房子
    // 切换场景
    scence1.style.transition = "opacity 1s linear"
    // 淡出
    scence1.style.opacity = 0;
    scence2.style["display"] = "block"
    return doAnimation(1000)


    // 5 切换场景 从场景1 到场景2 
    .then(function () {
        scence1.style["display"] = "none"
        var bd = document.querySelector("body")

        bd.style.background = "linear-gradient(45deg, #ee817f, #f19997)"

        // 淡入
        scence2.style.transition = "opacity 2s linear"
        scence2.style.opacity = 1;
        boy2.style.backgroundPositionX = "-1000%"
        // girl.style.backgroundPositionX = ""
        return doAnimation(2000)
    })


    
    // 6 女角色 放下书本的动画 
    .then(function () {
        // 女孩子 放下书，
        girl_time = boy_move(girl, 0, -400)
        return doAnimation(500)
    })
    // 7 2个角色 会面
    .then(function () {
        clearInterval(girl_time)
        girl_time = boy_move(girl, -500, -1100)
        // 平移角色
        // 目标位置 
        boy2_el.style.left = "180px"
        // 女孩子走出房门
        girl_el.style.left = "-30px"
        boy2_time = boy_move(boy2, -1000, -1200)

        // 男孩子的走路
        return doAnimation(2000)
    })
    // 8 停掉走路效果
    .then(function () {
        // 停掉走路效果
        clearInterval(boy2_time)
        // clearInterval(girl_time)

        //删除女角色
        $(".sence2 .girl").style.display = "none"
        return doAnimation(1000)
    })
    // 9 角色换位置 -D7
    .then(function () {
        
    })
    // 10 -D7
    .then(function () {
        // clearInterval(boy2_time)
        // 确保角色是站着而不是走着
        boy2.style["backgroun-position-x"] = "-1000%"
        // 把角色的脸朝向取180度的变换
        boy2.style.transform = "none";
        return doAnimation(100)
    })
    // 11 -控制 女角色的位置 -D7
    .then(function () {

        
        return doAnimation(1000)
    })
    // 12 -控制女角色的方向 D7
    .then(function () {

        // return doAnimation(2000)
    })
    // 13. 角色旋转
    .then(function () {
        
        rotate();
        return doAnimation(1008)

    }) 
    .then(function () {
        //显示对话框
        $(".chatBox").style.display = "block"
    })
    .then(function () {
        clearInterval(Interval)
    })
    .then(function () {
        //显示书本
        $(".book").style.display = "block"

        return doAnimation(100)
        
    })
    .then(function () {
        // 书本飞行
        $(".book").style.left = "200px"
        return doAnimation(2050)
    })
    .then(function () {
        
        // 让书本掉落
        $(".book").style.transition = "all 0.1s linear "
        $(".book").style.top = "240px"
    })
    .then(function () {
        
        rotate();
        return doAnimation(35)
    })
    .then(function () {
        clearInterval(Interval)
    })
}

