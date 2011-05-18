/**
 * JS、CSS文件加载器
 *
 * @author rongjihuang@gmail.com
 * @date 2011-04-11
 * @ref modify from nbl.plus.js v2.0
 */

if(!window['bc'])window['bc']={};
bc.loader = {
	c: document,
	q: {}, // The dictionary that will hold the script-queue
	n: null,
	
	// The loader function
	//
	// Called with an array, it will interpret the options array
	// Called without an array it will try to load the options from the script-tag's data-nbl attribute
	l: function(a) { 
		var b, c, x, y, z, s, l, i = j = 0, m = bc.loader; m.h = m.c.head || m.c.body;
		
		// The timeout counter, counts backwards every 50ms from 50 ticks (50*50=2500ms by default)
		if (!m.i) {
			m.s = m.f = 0; // Reset counters: completed, created, timeout function
			m.i = setInterval(
				function() { 
					// If the timeout counter dips below zero, or the amount of completed scripts equals the amount 
					// of created script-tags, we can clear the interval
					if (m.o < 0 || m.s == 0) { 
						m.i = clearInterval(m.i); 
						// If the amount of completed scripts is smaller than the amount of created script-tags,
						// and there is a timeout function available, call it with the current script-queue.
						(m.s > 0 && m.f) && m.f(m.q)
					} 
					m.o--
				},
				m.o = 50 // Set the initial ticks at 50, as well as the interval at 50ms
			);
		}

		// If no arguments were given (a == l, which is null), try to load the options from the script tag
		if (a == m.n) {
			s = m.c.getElementsByTagName("script"); // Get all script tags in the current document
			while (j < s.length) {
				if ((a = eval("("+s[j].getAttribute("data-nbl")+")")) && a) { // Check for the data-nbl attribute
					m.h = s[j].parentNode;
					break
				}
				j++
			}
		}
		
		// If an options array was provided, proceed to interpret it
		if (a&&a.shift) {
			while (i < a.length) { // Loop through the options
				b = a[i]; // Get the current element
				c = a[i+1]; // Get the next element
				x = 'function';
				y = typeof b; 
				z = typeof c;
				l = (z == x) ? c : (y == x) ? b : m.n; // Check whether the current or next element is a function and store it
				if (y == 'number') m.o = b/50; // If the current element is a number, set the timeout interval to this number/50
				// If the current element is a string, call this.a() with the string as a one-element array and the callback function l
				if (y == 'string') m.a([b], l); 
				// If the current element is an array, call this.a() with a two-element array of the string and the next element
				// as well as the callback function l
				b.shift && m.a([b.shift(), b], l); 
				if (!m.f && l) m.f = l; // Store the function l as the timeout function if it hasn't been set yet
				i++
			}
		}
	},
	a: function(u,l) {
		var s, t, m = this, n = u[0].replace(/.+\/|\.min\.js|\.js|\?.+|\W/g, ''), k = {js: {t: "script", a: "src"}, css: {t: "link", a: "href", r: "stylesheet"}, "i": {t: "img", a: "src"}}; // Clean up the name of the script for storage in the queue
		t = u[0].match(/\.(js|css).*$/i); t = (t) ? t[1] : "i";
		if(m.q[n] === true){
			if(logger.debugEnabled)logger.debug("loader: skip load '" + u[0] + "'");
			l && l(); // Call the callback function l
			return;//避免重复加载和解析
		}
		s = m.q[n] = m.c.createElement(k[t].t);
		var file = u[0];
		if(bc.debug)
			file = bc.addParamToUrl(file,"ts="+bc.ts);//首次打开主页的时间
		else
			file = bc.addParamToUrl(file,"ts="+bc.buildTime);//系统编译发布的时间
			
		s.setAttribute(k[t].a, file);
		// Fix: CSS links do not fire onload events - Richard Lopes
		// Images do. Limitation: no callback function possible after CSS loads
		if (k[t].r){
			s.setAttribute("rel", k[t].r);
			m.q[n] = true;//强制设为true
			l && l(); // Call the callback function l
		}else {
			// When this script completes loading, it will trigger a callback function consisting of two things:
			// 1. It will call nbl.l() with the remaining items in u[1] (if there are any)
			// 2. It will execute the function l (if it is a function)
			s.onload = s.onreadystatechange = function(){
				if(logger.debugEnabled)logger.debug("loader: finished loaded '" + u[0] + "' and call the callback");
				var s = this, d = function(){
					var s = m, r = u[1]; 
					s.q[n] = true; // Set the entry for this script in the script-queue to true
					r && s.l(r); // Call nbl.l() with the remaining elements of the original array
					l && l(); // Call the callback function l
					s.s--
				};
				if ( !s.readyState || /de|te/.test( s.readyState ) ) {
					s.onload = s.onreadystatechange = m.n; d() // On completion execute the callback function as defined above
				}
			};
			m.s++
		}
		if(logger.debugEnabled)logger.debug("loader: append '" + u[0] + "' to head");
		m.h.appendChild(s) // Add the script to the document
	}
};
bc.loader.l();
bc.load=bc.loader.l;//快捷方式
