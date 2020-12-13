				function animate(obj,target,callBack){
					// 解决方案 元素只有一个定时器执行
					clearInterval(obj.timer);
					obj.timer = setInterval(function(){
						// 给步长值取整 向上（Math.ceil）向下（Math.floor）
						var step = (target - obj.offsetLeft) / 10 ;
						// 如果step为正值则向上取整 若为负值（倒着走）则向下取整
						step = step > 0 ?Math.ceil(step) : Math.floor(step); 
						if(obj.offsetLeft == target){
							clearInterval(obj.timer);
							// 回调函数写到定时器结束里面
							//判断是否有回调函数
							if(callBack){
								// 有就调用回调函数（callback函数）
								callBack();
							}
						}
						obj.style.left = obj.offsetLeft + step + 'px';
					},30);
				}		