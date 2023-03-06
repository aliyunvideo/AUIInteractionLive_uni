/** 
 * 转换为 https 协议
 * @param {string} url 地址
 */
export const replaceHttps = (url) => {
  if (!url || typeof url !== 'string') return url;
  return url.replace(/^http:\/\//i, 'https://');
};

// 从下划线格式转为驼峰
export function convertToCamel (data) {
  if (typeof data !== 'object' || !data) return data
  
  if (Array.isArray(data)) {
    return data.map(item => convertToCamel(item));
  }

  let newObj = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let newKey = key.replace(/_([a-z])/g, res => res[1].toUpperCase());
      newObj[newKey] = convertToCamel(data[key]);
    }
  }
  return newObj;
}

/**
 * 通过昵称取颜色
 * @param {string} [name]
 * @return {string}
 */
export function getNameColor(name) {
  const NicknameColors = ['#FFAB91', '#FED998', '#F6A0B5', '#CBED8E', '#95D8F8'];
  if (!name) {
    return '';
  }
  return NicknameColors[name.charCodeAt(0) % NicknameColors.length];
}

// 获取一个max和min之间的随机数
export function randomNum(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * 节流
 * @param {function} fn
 * @param {number} wait 毫秒时间
 * @param {boolean} options.noLeading 是否不立刻执行第一次
 * @return {function}
 */
export function throttle(fn, wait, options = {}) {
    let callback = fn;
    let timerId = null;
	
	let firstInvoke = typeof options.noLeading === 'boolean' ? !options.noLeading : true

    function throttled() {
        let context = this;
        let args = arguments;
		
		// 如果是第一次触发，直接执行
		if (firstInvoke) {
		    callback.apply(context, args);
		    firstInvoke = false;
		    return ;
		}

        // 如果定时器已存在，直接返回
        if (timerId) {
            return ;
        }

        timerId = setTimeout(function() {  
            // 注意这里 将 clearTimeout 放到 内部来执行了
            clearTimeout(timerId);
            timerId = null;

            callback.apply(context, args);
        }, wait);
    }

    // 返回一个闭包
    return throttled;
}
