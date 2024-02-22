function createRandomGenerator(seed) {
    var currentSeed = seed;

    return function () {
        var x = Math.sin(currentSeed++) * 10000;
        return x - Math.floor(x);
    };
}

var seed = Math.random();
// 创建自定义的伪随机数生成器
var randomGenerator = createRandomGenerator(seed);


function rand(start, end, num) {
    // 使用 Math.random() 生成随机种子
    const randomNumbers = [];
    for (let i = 0; i < num; i++) {
        const randomNumber = Math.floor(randomGenerator() * (end - start)) + start;
        if (randomNumbers.includes(randomNumber)) {
            i--;
            continue;
        }
        randomNumbers.push(randomNumber);
    }

    return randomNumbers.sort(function (a, b) {
        return a - b;
    })
}

function formatNumbers(numbers)
{
    result = ''
    numbers.forEach(element => {
        result += element.toString().padStart(2, '0')
        result += ' '
    });
    return result
}

function ShuangSeQiu() {
    // 6+1
    result = ''
    result += formatNumbers(rand(1, 33, 6))
    result += ' + '
    result += formatNumbers(rand(1, 16, 1))
    return result
}

function QiLeCai() {
    return formatNumbers(rand(1, 30, 7))
}

function KuaiLeBa() {
    // 选10
    // 选9
    // 选8
    choice = rand(1, 3, 1)
    if (choice == 1)
        return formatNumbers(rand(1, 80, 10))
    if (choice == 2)
        return formatNumbers(rand(1, 80, 9))
    if (choice == 3)
        return formatNumbers(rand(1, 80, 8))
}
function onLoad() {
    // 获取当前日期是星期几
    daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    currentDay = daysOfWeek[dayOfWeek];

    // 选择具有类名 "dayOfWeek" 的 <span> 元素，并将其文本更改为 "currentDay"
    spanElement = document.querySelector('span.dayOfWeek');
    if (spanElement) {
        spanElement.textContent = currentDay;
    }

    // currentDay = '星期一'
    // currentDay = '星期六'
    // 双色球---每周二、四、日开奖
    // 七乐彩---每周一、三、五开奖
    // 快乐8---每天开奖一次
    methodText = '快乐8'
    if (['星期二', '星期四', '星期日'].includes(currentDay))
        methodText = '双色球'
    if (['星期一', '星期三', '星期五'].includes(currentDay))
        methodText = '七乐彩'


    spanElement = document.querySelector('span.method');
    if (spanElement) {
        spanElement.textContent = methodText;
    }

    const getContent = (methodText) => {
        contentText = ''
        if (methodText === '双色球')
            contentText = ShuangSeQiu()
        if (methodText === '七乐彩')
            contentText = QiLeCai()
        if (methodText === '快乐8')
            contentText = KuaiLeBa()
        console.log(methodText);
        return contentText
    }

    const setSpan = (methodText, selector) => {
        spanElement = document.querySelector(selector);
        if (spanElement) {
            spanElement.textContent = getContent(methodText);
        }
        getContent(methodText);
    }
    setSpan(methodText, 'p.content1');
    setSpan(methodText, 'p.content2');
    setSpan(methodText, 'p.content3');
    setSpan(methodText, 'p.content4');
    setSpan(methodText, 'p.content5');
}

document.addEventListener('DOMContentLoaded', onLoad);