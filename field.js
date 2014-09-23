/**
 * Created by zeru on 14-8-27.
 */
document.oncontextmenu = function() {
    event.returnValue = false;
}
var _mineNum = 10;//雷的数量
var _panelNum = 10;//方格数量
var panels = [];

//初始化
function init(){
    layoutPanels(_panelNum);
    layMine(_mineNum);

    for(var i=0;i<panels.length;i++){
        panels[i].arroundMineCount = getMineCountAround(i);
        //console.log(getMineCountAround(i));
    }
}

//展示全部方格
function displayAll(){
    for(var i=0;i<panels.length;i++){
        if(panels[i].state != 1){
            panels[i].open(document.getElementById('field').children[i]);
        }
    }
}

//展示周围方格
function displayAround(currentid){
    console.log(document.getElementById('field').children[currentid]);
    if(panels[currentid].state === 1 || panels[currentid].hasMine){
        //console.log('3');
        return;
    }

    panels[currentid].open(document.getElementById('field').children[currentid]);

    var panes = getPanelsAround(currentid);

    for(var i=0;i<panes.length;i++){
        if(getMineCountAround(panes[i]) === 0){
             displayAround(panes[i]);
        }else{
            if(panels[panes[i]].state != 1&& !panels[panes[i]].hasMine){
                panels[panes[i]].open(document.getElementById('field').children[panes[i]]);
            }
        }
    }
}


/*私有函数 */

//获得周围方格数
function getPanelsAround(currentid){
    var paneHeight = 52;
    var paneWidth = 52;
    var panes = document.getElementById('field').children;
    var result = [];

    var curTop = parseInt(panes[currentid].offsetTop-1);
    var curLeft = parseInt(panes[currentid].offsetLeft-1);
    for(var i=0;i<panes.length;i++){
        if(i != currentid){
            var top = parseInt(panes[i].offsetTop-1);
            var left = parseInt(panes[i].offsetLeft-1);

            if (Math.abs(top - curTop) == 0 && Math.abs(left - curLeft) ==  paneWidth ||
                Math.abs(left - curLeft) == 0 && Math.abs(top - curTop) ==  paneHeight ||
                Math.abs(top - curTop) == paneHeight && Math.abs(left -  curLeft) == paneWidth||
                Math.abs(left - curLeft) == paneWidth && Math.abs(top -  curTop) == paneHeight){
                result.push(i);
            }
        }

    }
    //console.log(result);
    return result;
}

//获得周围地雷数
function getMineCountAround(currentid){
    var mineCount = 0;
    var paneArround = getPanelsAround(currentid);

    for(var i=0;i<paneArround.length;i++){
        if(panels[paneArround[i]].hasMine){
            mineCount++;
        }
        //console.log(mineCount);
    }
    //console.log(mineCount);
    return mineCount;
}

//布置方格
function layoutPanels(panelNum){
    var field = document.getElementById('field');

    for(var i=0;i<panelNum * panelNum;i++){
        //配置方格
        var newPanel = new Panel();
        var pane=document.createElement("div");
        var className = 'panel';
        pane.className = className;
        pane.onclick = function(){
            click();
        };
        pane.oncontextmenu = function(){rightClick(event)};
        pane.id = i;

        field.appendChild(pane);
        panels[i] = newPanel;
    }
}

//随机布雷
function layMine(mineNum){
    var mines = [];
    //获取0-100之间的mineNum个随机数，作为地雷
    for(var i=0;i<mineNum;i++){
        var num = randomNum(0,99,100);
        mines[i] = num;
    }
    //布雷
    for(var i=0;i<mines.length;i++){
        for(var j=0;j<panels.length;j++){
            if(j === mines[i]){
                panels[j].hasMine = 1;
            }
        }
    }
    console.log(mines);
}

//给出指定范围内的随机数
function randomNum(min,max,n){
    var x = Math.round(Math.random() * n);
    if(x>=min && x<=max){
        return x;
    }else{
        return randomNum(min,max,n);
    }
}

//判断胜利
function isAllMineSweeped(){
    var markedCount = 0;
    var mineCount = 0;

    for(var i=0;i<panels.length;i++){
        if(panels[i].hasMine){
            mineCount++;
        }
        if(panels[i].state === 3){
            markedCount++;
            if(!panels[i].hasMine){
                return false;
            }
        }
    }
    return markedCount === mineCount;

}

//点击事件
function click(){
    //console.log(event.srcElement.id);
    var index = event.srcElement.id;
    if(panels[index].hasMine){
        panels[index].open(document.getElementById('field').children[index]);
        displayAll();
        alert('You lose!');
    }else{
        console.log(index);
        displayAround(index);
    }

    if(isAllMineSweeped()){
        alert('you win!');
    }

}

function rightClick(event){
    //console.log(event);
    var index = event.srcElement.id;
    if(panels[index].state === 3){
        panels[index].reset(document.getElementById('field').children[index]);
    }else{
        panels[index].mark(document.getElementById('field').children[index]);
    }
    if(isAllMineSweeped()){
        alert('you win!');
    }
    event.returnValue = false;
}
