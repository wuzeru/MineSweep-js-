/**
 * Created by zeru on 14-8-27.
 */
function Panel(){
    this.arroundMineCount = 0;
    this.hasMine = 0;
    this.state = 2;//1:打开，2:关闭，3:标记
}

Panel.prototype = {
    open:function(current){
        console.log(current);
        if(this.hasMine === 1){
            //console.log('1');
            changeDiv(current,'MineBomp');
            current.onclick = function(){};
        }
        else{
            switch(this.arroundMineCount){
                case 0:current.style.background = '#ffffff';break;
                case 1:changeDiv(current,'num1');break;
                case 2:changeDiv(current,'num2');break;
                case 3:changeDiv(current,'num3');break;
                case 4:changeDiv(current,'num4');break;
                case 5:changeDiv(current,'num5');break;
                case 6:changeDiv(current,'num6');break;
                case 7:changeDiv(current,'num7');break;
                case 8:changeDiv(current,'num8');break;
            }
        }
        this.state = 1;
    },
    mark:function(current){
        current.style.background = 'url(./image/Marked.png)';
        current.style.backgroundRepeat = 'no-repeat';
        current.style.backgroundSize = '100%';
        this.state = 3;
    },
    reset:function(current){
        current.style.background = '#FF3333';
        this.state = 2;
    }
};

function changeDiv(current,name){
    current.style.background = 'url(./image/'+name+'.png)';
    current.style.backgroundRepeat = 'no-repeat';
    current.style.backgroundSize = '100%';
    current.onclick = function(){};
}



