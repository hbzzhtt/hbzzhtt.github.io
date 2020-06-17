require=function t(e,i,s){function c(o,a){if(!i[o]){if(!e[o]){var r="function"==typeof require&&require;if(!a&&r)return r(o,!0);if(n)return n(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var p=i[o]={exports:{}};e[o][0].call(p.exports,function(t){var i=e[o][1][t];return c(i?i:t)},p,p.exports,t,e,i,s)}return i[o].exports}for(var n="function"==typeof require&&require,o=0;o<s.length;o++)c(s[o]);return c}({game:[function(t,e,i){"use strict";cc._RF.push(e,"991ech8TmxLJqXDErIiRpNR","game"),cc.Class({"extends":cc.Component,properties:{starPrefab:{"default":null,type:cc.Prefab},maxStarDuration:0,minStarDuration:0,ground:{"default":null,type:cc.Node},player:{"default":null,type:cc.Node},score:{"default":0,displayName:"Score (player)",tooltip:"The score of player"},scoreDisplay:{"default":null,type:cc.Label},scoreAudio:{"default":null,url:cc.AudioClip}},onLoad:function(){this.groundY=this.ground.y+this.ground.height/2,this.spawnNewStar(),this.spawnNewStar(),this.timer=0},gainScore:function(){this.score+=1,this.scoreDisplay.string="Score:"+this.score,cc.audioEngine.playEffect(this.scoreAudio,!1)},spawnNewStar:function(){var t=cc.instantiate(this.starPrefab);t.setPosition(this.getNewStarPosition()),this.node.addChild(t),t.getComponent("star").game=this,this.starDuration=this.minStarDuration+Math.random()*(this.maxStarDuration-this.minStarDuration),this.timer=0},getNewStarPosition:function(){var t=0,e=this.groundY+Math.random()*this.player.getComponent("player").jumpHeight,i=this.node.width/2;return t=2*(Math.random()-.5)*i,cc.log("randY is"+e),cc.log("this.groundY is "+this.groundY),cc.v2(t,e)},update:function(t){var e=this.node.width/2,i=0-e;return this.player.getComponent("player").node.x>e?this.player.getComponent("player").node.x=i:this.player.getComponent("player").node.x<i&&(this.player.getComponent("player").node.x=e),this.timer>this.starDuration?void this.gameOver():void(this.timer+=t)},gameOver:function(){this.player.stopAllActions(),cc.director.loadScene("game")}}),cc._RF.pop()},{}],player:[function(t,e,i){"use strict";cc._RF.push(e,"ff3d7VufE9DJ50vM/DQ5pW+","player"),cc.Class({"extends":cc.Component,properties:{jumpHeight:0,jumpDuration:0,maxMoveSpeed:0,accel:0,disaccel:0,jumpAudio:{"default":null,url:cc.AudioClip}},onLoad:function(){this.node.runAction(this.setJumpAction()),this.accLeft=!1,this.accRight=!1,this.firstJump=!1,this.secondJump=!1,this.firstJumpFinish=!1,this.secondJumpFinish=!1,this.xSpeed=0,cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},setJumpAction:function(){cc.log("jump to"+this.jumpHeight),cc.log("player y is"+this.node.y);var t=cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn()),i=cc.callFunc(this.playJumpDownCallback,this);return cc.repeatForever(cc.sequence(t,e,i))},playJumpDownCallback:function(){cc.audioEngine.playEffect(this.jumpAudio,!1)},onKeyDown:function(t){switch(t.keyCode){case cc.KEY.left:this.accLeft=!0,this.flipY(!0);break;case cc.KEY.right:this.accRight=!0}},onKeyUp:function(t){switch(t.keyCode){case cc.KEY.left:this.accLeft=!1;break;case cc.KEY.right:this.accRight=!1}},update:function(t){this.accLeft?this.xSpeed-=this.accel*t:this.accRight?this.xSpeed+=this.accel*t:this.xSpeed>0&&this.xSpeed-this.disaccel>0?this.xSpeed-=this.disaccel:this.xSpeed<0&&this.xSpeed+this.disaccel<0?this.xSpeed+=this.disaccel:this.xSpeed=0,Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t}}),cc._RF.pop()},{}],star:[function(t,e,i){"use strict";cc._RF.push(e,"9eac9ueyXNEEIiDWl5jpgC/","star"),cc.Class({"extends":cc.Component,properties:{pickRadius:0},onLoad:function(){},update:function(t){this.getPlayerDistance()<this.pickRadius&&this.onPicked();var e=1-this.game.timer/this.game.starDuration,i=50;this.node.opacity=i+Math.floor(e*(255-i))},getPlayerDistance:function(){var t=this.game.player.getPosition(),e=this.node.position.sub(t).mag();return e},onPicked:function(){this.game.spawnNewStar(),this.game.gainScore(),this.node.destroy()}}),cc._RF.pop()},{}]},{},["game","player","star"]);