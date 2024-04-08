var globalImg = null;
var MaxSnow = 100
// DOM节点 
var el = null
var ctx = null

// 03- 雪块运动
function run() {
    // 获取 DOM节点，
    el = document.querySelector("#snow")
    ctx = el.getContext("2d")

    // 调用 生成雪花 ( 一次性生成)
    // generalSnow()

    // 加载图片，然后，
    loadImage().then(function () {
        // 开个定时器 计算 位置，
        setInterval(function () {
            // 边界的问题
            computePosition();
            // 然后清掉旧的图片，显示新图片
            ctx.clearRect(0, 0, 1650, 900)
            showSnow()
        }, 60)
    })
}
// 保存雪块
var arr_snow = [] // 保存雪块

 // 生成随机的整数 （在某区间）
 function randomInt(min, max) {
    var seed = Math.random() // 0~1
    // res = min + max * seed   // seed 应该 是乘以 max - min
    var res = min + (max - min) * seed;
    return Number(res.toFixed())   // 取整 
}
// 01- 加载图片
function loadImage() {
    // 待处理列表
    // ... 
    return new Promise(function (resolve) {
        var img = new Image()
        img.src = "./images/white-snow.png"
        img.onload = function () {
            // 保存到全局
            globalImg = img;

            // 遍历 数据里面的所有元素，把 img 属性设置为 img
            for (var i = 0; i < arr_snow.length; i++) {
                arr_snow[i].img = img
            }

            // 加载完图片的时候我们才执行 resolve()
            resolve();
        }

    })
}

// 02- 生成 雪块
function generalSnow() {
    var number = 500;
    var arr = []    /// 保存生成后的雪花
    for (var i = 0; i < number; i++) {
        // 生成随机的位置
        var x = randomInt(0, 1650)
        var offsetX = randomInt(-5, 5)
        var offsetY = randomInt(2, 5)
        var width = randomInt(5, 25)

        // 课堂练习- 让大的雪花降快一点点，小的下降得慢一点点，
        // 根据一定的比例来 算出 加成 值 
        var f = width / 25 // 0~1 数字
        f = f * 10// 影响大小  -10  > 0~10 加成值
        f = Number(f.toFixed()) // 转成整数
        offsetY += f
        // console.log( { offsetX, offsetY, width } );
        var obj = {
            img: null, // 图片
            // 位置
            x: x,
            y: 0,
            // 大小
            width: width,
            height: width,
            // 方向
            // direct:  0,
            offsetX: offsetX,
            offsetY: offsetY,    // 控制下降的速度
        }
        arr.push(obj)
    }
    // 赋值给 arr_snow
    arr_snow = arr;
}
// 02- 加强版 生成雪花（按步来）
function gen_snow_by_step() {
    // 增加 条件
    if (arr_snow.length < MaxSnow) {
        // 每次调用，只生成一个
        var width = randomInt(5, 25);
        arr_snow.push({
            img: globalImg, // 图片 - 使用全局的图片
            // 位置
            x: randomInt(0, 1650),
            y: 0,
            // 大小
            width: width,
            height: width,
            // 方向
            // direct:  0,
            offsetX: randomInt(-5, 5),
            offsetY: randomInt(2, 5) + Number((10 * width / 25).toFixed()),    // 控制下降的速度
        })
    }
}



// 03-1 计算新位置
function computePosition() {
    // 计算前，去生成雪花
    gen_snow_by_step()

    for (var i = 0; i < arr_snow.length; i++) {
        /// 计算新位置：
        var item = arr_snow[i];
        item.x += item.offsetX
        item.y += item.offsetY
        // 边界的问题
        if (item.x < - 50) {
            item.x = 1650
        }
        if (item.x > 1700) {
            item.x = -50
        }
        // 下边界
        if (item.y > 900) {
            item.y = -50
        }
    }
}

// 03-2 - 显示 雪片
function showSnow() {
    for (var i = 0; i < arr_snow.length; i++) {
        var item = arr_snow[i]
        // 增加阴影效果
        // addSnowShandow(item, item.x + item.width / 2, item.y + item.width / 2, 1, 1.5 * item.width / 2)
        ctx.shadowColor = "rgba(0, 0, 255, 0.4)"
        ctx.shadowBlur = item.width / 2 ;
        
        // drawImage（加载完的图片, 坐标X，坐标Y，Width,height)
        ctx.drawImage(item.img, item.x, item.y, item.width, item.height)
    }
}
// 03-3 - 增加阴影效果
function addSnowShandow(item, x, y, r1, r2) {
    var myStyle = ctx.createRadialGradient(x, y, r1, x, y, r2)
    myStyle.addColorStop(0, "rgba(255, 255, 255, 0.8)")
    myStyle.addColorStop(1, "rgba(255, 255, 255, 0)")
    ctx.fillStyle = myStyle;
    ctx.arc(x, y, r2, 0, 2 * Math.PI)
    ctx.fill()
}


// //  开始执行控制 run()
// run();