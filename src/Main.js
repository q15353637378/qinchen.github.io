/**
 * Created by Rychou on 2018/4/19.
 */
import React, { Component } from 'react'
import $ from 'jquery'
import url from './audio/gbqq.mp3' // 引入背景音乐文件


class Main extends Component {
    state = {
        date: {},
    }
    componentDidMount() {
        this.print();
        setInterval(() => {
            this.time(2020, 9, 1) // 你们的纪念日
        }, 1000
        )
        var audio = document.getElementById("audio");
        setTimeout(() => audio.play(), 8500) // 背景音乐在页面加载后，延迟播放的时长，单位：毫秒。
    }
    print = () => {
        $.fn.autotype = function () {
            var _this = $(this);
            var str = _this.html();
            // 正则替换代码行之间添加的多个空格，不去除换行输出会有明显的停顿：实际是在输出多个空格
            str = str.replace(/(\s){2,}/g, "$1");
            var index = 0;
            $(this).html('');
            var timer = function fn() {
                var args = arguments;
                var current = str.slice(index, index + 1);
                // html标签完整输出,如：<p>
                if (current == '<') {
                    index = str.indexOf('>', index) + 1;
                }
                else {
                    index++;
                }
                //位运算符: 根据setInterval运行奇偶次来判断是否加入下划线字符“_”，使输入效果更逼真
                if (index < str.length - 1) { //打印字符倒数第2个字符开始，不加下划线字符，以防止结束符可能会多输出一下划线字符
                    _this.html(str.substring(0, index) + (index & 1 ? '_' : ''));
                } else {
                    _this.html(str.substring(0, index));
                    clearTimeout(timer);
                };
                setTimeout(fn, 200)
            };
            // 延迟1s开始
            setTimeout(timer, 1000);
        };
        $("#autotype").autotype();
    }
    time = (year, month, day) => {
        var dateNow = new Date();
        var dateJNR = new Date(year, month - 1, day);
        // var anniversary = parseInt((dateNow - dateJNR) / (365*24*3600*1000))
        var d = parseInt((dateNow - dateJNR) / (24 * 3600 * 1000));
        var hour = parseInt(((dateNow - dateJNR) / (3600 * 1000)) % 24);
        var minute = parseInt((dateNow - dateJNR) / (1000 * 60) % 60);
        var second = parseInt((dateNow - dateJNR) / 1000 % 60);
        this.setState({ date: { d: d, hour: hour, minute: minute, second: second } });
    };
    render() {
        const date = () => {
            if (this.state.date.d !== undefined) {
                const { d, hour, minute, second } = this.state.date
                return (<p>我们已经一起走过了: <span className="date-text">{d}</span> 天 <span className="date-text">{hour}</span> 小时 <span className="date-text">{minute}</span> 分 <span className="date-text">{second}</span> 秒 </p>
                )
            }
        }
        return (
            <div className="App animated bounceInLeft">
                <div className="date">{date()}</div>
                <div id="autotype">
                    <h2 style={{ fontWeight: 800 }}>写给我的大宝贝 玲玲</h2>
                    <p >在开始狡辩之前，先放首歌当背景音乐吧，情绪得渲染到位了❤❤❤！Music!</p>
                    <p>今天是咱们俩从相遇时算起的第610天，从2020年9月2日到现在，我就权当它是六一啦
                    ，做一份小礼物送给你，也是为自己这么长时间的粗心道歉，给个机会咯。</p>
                    
                    <p>咱俩故事的开头就像是一颗小星星突然飞到了我的身边，让我之后的生活变了样。邀请我去滑板社一起玩，我心里还有点儿发憷，怕自己不太合群，
                    不过晚上还是收拾了一下自己跑过去啦，内个时候心里真的很开心的，虽然滑的也是极为僵硬，这么看杨萍说我像赵四也没毛病，后来上课有时就会碰到，你送给我的
                    大白兔奶糖真甜呀，甜的我舍友都羡慕了，我呢，就心里暗自开心，越来越喜欢你啦。时间慢慢的滑到了十一国庆，紧张，特别紧张，一边约你去看电影。一边派朋友去花店取花，也不知道你会喜欢什么花，还去问你，现在想想太憨批了，希望能给你一场惊喜的表白。
                    
                </p> 
                    <p>到了大四有的人去考研，有的人去工作，我自己也一门心思的呆在了工作室，用心陪伴你的时间也慢慢变少了，唉。。。 再到后面见面的时间越来越少，出现了各种问题，还为此争吵，
                       我们对事情的看法与表达也有着极大的不同，当你指出我的毛病时，我可能才会想到原来一些事儿确实做错了，或者做的不好，
                       可以说是一针见血(〒︿〒)啦，我认错啦，最好的玲玲大美女。
                </p>
                    <p>喜欢你的感觉，就是想把柚子最甜的部分给你，奶油蛋糕上的小芒果也给你，最大的鸡腿给你，还有可爱的我全部给你。”
                        期望疫情早早结束的那一天，更期待和你再次拥抱在一起的感觉。
                </p>
                    <p>最后祝我现在可能还在被窝里睡觉的小香宝儿好梦哦！</p>
                    <div style={{ textAlign: 'right' }}>
                        <p>爱你呦♥秦思成</p>
                        <p>2022年4月05日</p>
                    </div>
                </div>
                <audio id="audio" src={url}></audio>
            </div>

        )
    }
}
export default Main