//   function a(t) {
//     if (o[t]) return o[t].exports;
//     var n = (o[t] = {
//       i: t,
//       l: !1,
//       exports: {},
//     });
//     return e[t].call(n.exports, n, n.exports, a), (n.l = !0), n.exports;
//   }
//   (a.e = function (e) {
//     var t = [],
//       n = s[e];
//     if (0 !== n)
//       if (n) t.push(n[2]);
//       else {
//         var o = new Promise(function (t, o) {
//           n = s[e] = [t, o];
//         });
//         t.push((n[2] = o));
//         var r,
//           c = document.createElement("script");
//         (c.charset = "utf-8"),
//           (c.timeout = 120),
//           a.nc && c.setAttribute("nonce", a.nc),
//           (c.src = (function (e) {
//             return (
//               a.p +
//               "" +
//               ({
//                 4: "assets/js/components/desktop/list",
//                 5: "assets/js/components/desktop/profile",
//                 6: "assets/js/components/desktop/rank",
//                 7: "assets/js/components/desktop/suggest",
//                 8: "assets/js/components/library",
//                 9: "assets/js/components/mobile/list",
//                 10: "assets/js/components/mobile/profile",
//                 11: "assets/js/components/mobile/rank",
//                 12: "assets/js/components/mobile/suggest",
//                 13: "assets/js/components/notification",
//                 14: "assets/js/components/order",
//                 15: "assets/js/components/property",
//                 16: "assets/js/components/redeem",
//                 17: "assets/js/components/reward",
//                 18: "assets/js/components/setting",
//                 19: "assets/js/components/upgrade",
//               }[e] || e) +
//               ".js?h=" +
//               {
//                 4: "3907c8e28f8026e00cfa",
//                 5: "70122ba277581532ae84",
//                 6: "f1fbb6e826be8aebc1e7",
//                 7: "2f9ae177a09393f121a6",
//                 8: "696d964ff780e1c5c391",
//                 9: "eb1f7f2a81201564b55c",
//                 10: "982683c1fc0630290632",
//                 11: "c18d287b27a558ccb79d",
//                 12: "a180eb713a666d120a3f",
//                 13: "dd301d80878c7d3126de",
//                 14: "1e37839d4156cbd79ec0",
//                 15: "1be8110fca5cba18ab9c",
//                 16: "6ecf833a5817ee60523c",
//                 17: "f769b9ae247fa1dd926b",
//                 18: "c755a30ad5ffeb419d8d",
//                 19: "b8a6ada2c25754041c9c",
//               }[e]
//             );
//           })(e));
//         var i = new Error();
//         r = function (t) {
//           (c.onerror = c.onload = null), clearTimeout(p);
//           var n = s[e];
//           if (0 !== n) {
//             if (n) {
//               var o = t && ("load" === t.type ? "missing" : t.type),
//                 r = t && t.target && t.target.src;
//               (i.message =
//                 "Loading chunk " + e + " failed.\n(" + o + ": " + r + ")"),
//                 (i.name = "ChunkLoadError"),
//                 (i.type = o),
//                 (i.request = r),
//                 n[1](i);
//             }
//             s[e] = void 0;
//           }
//         };
//         var p = setTimeout(function () {
//           r({
//             type: "timeout",
//             target: c,
//           });
//   (a.m = e),
//     (a.c = o),
//     (a.d = function (e, t, n) {
//       a.o(e, t) ||
//         Object.defineProperty(e, t, {
//           enumerable: !0,
//           get: n,
//         });
//     }),
//     (a.r = function (e) {
//       "undefined" != typeof Symbol &&
//         Symbol.toStringTag &&
//         Object.defineProperty(e, Symbol.toStringTag, {
//           value: "Module",
//         }),
//         Object.defineProperty(e, "__esModule", {
//           value: !0,
//         });
//     }),
//     (a.t = function (e, t) {
//       if ((1 & t && (e = a(e)), 8 & t)) return e;
//       if (4 & t && "object" == typeof e && e && e.__esModule) return e;
//       var n = Object.create(null);
//       if (
//         (a.r(n),
//         Object.defineProperty(n, "default", {
//           enumerable: !0,
//           value: e,
//         }),
//         2 & t && "string" != typeof e)
//       )
//         for (var o in e)
//           a.d(
//             n,
//             o,
//             function (t) {
//               return e[t];
//             }.bind(null, o)
//           );
//     return n;
//     }),
//     (a.n = function (e) {
//       var t =
//         e && e.__esModule
//           ? function () {
//               return e.default;
//             }
//           : function () {
//               return e;
//             };
//       return a.d(t, "a", t), t;
//     }),
//     (a.o = function (e, t) {
//       return Object.prototype.hasOwnProperty.call(e, t);
//     }),
//     (a.p = "/"),
//     (a.oe = function (e) {
//       throw (console.error(e), e);
//     });
//   var c = (window.webpackJsonp = window.webpackJsonp || []),
//     i = c.push.bind(c);
//   (c.push = t), (c = c.slice());
//   for (var p = 0; p < c.length; p++) t(c[p]);
//   var f = i;
//   n();
// })([]);
//   132: function (t, e, n) {
//       var r = n(315);
//       "string" == typeof r && (r = [[t.i, r, ""]]);
//       var i = {
//         hmr: !0,
//         transform: void 0,
//         insertInto: void 0,
//       };
//       n(16)(r, i);
//       r.locals && (t.exports = r.locals);
//     },
//     133: function (t, e, n) {
//       var r = n(317);
//       "string" == typeof r && (r = [[t.i, r, ""]]);
//       var i = {
//         hmr: !0,
//         transform: void 0,
//         insertInto: void 0,
//       };
//       n(16)(r, i);
//       r.locals && (t.exports = r.locals);
//     },
//     134: function (t, e, n) {
//       var r = n(319);
//       "string" == typeof r && (r = [[t.i, r, ""]]);
//       var i = {
//         hmr: !0,
//         transform: void 0,
//         insertInto: void 0,
//       };
//       n(16)(r, i);
//       r.locals && (t.exports = r.locals);
//     },
//     135: function (t, e, n) {
//       var r = n(321);
//       "string" == typeof r && (r = [[t.i, r, ""]]);
//       var i = {
//         hmr: !0,
//         transform: void 0,
//         insertInto: void 0,
//       };
//       n(16)(r, i);
//       r.locals && (t.exports = r.locals);
//     },
//     157: function (t, e) {
//       t.exports = "/images/1.png?9939ee678e42b890a495ff3c311e8747";
//     },
//     158: function (t, e) {
//       t.exports = "/images/2.png?c186895a18a48c5a7d7efd111460295f";
//     },
//     159: function (t, e) {
//       t.exports = "/images/3.png?05ea354f7668a0f314e7fc615d8474b6";
//     },
//     160: function (t, e) {
//       t.exports = "/images/4.png?883fb7fcb047bb694a6f65668e2e4bc6";
//     },
//     161: function (t, e) {
//       t.exports = "/images/5.png?8c2a93ab010e2928f269ba8683c12583";
//     },
//     162: function (t, e) {
//       t.exports = "/images/6.png?adee152d95366e0d03b8125832fe932b";
//     },
//     163: function (t, e) {
//       t.exports = "/images/7.png?b94378fb19d75da203e14615145ef5da";
//     },
//     164: function (t, e) {
//       t.exports = "/images/8.png?9fabfa24078c690601a9a7dfecd13f09";
//     },
//     165: function (t, e) {
//       t.exports = "/images/9.png?ee8269e21eb50661840da42d1c8cc397";
//     },
//     166: function (t, e) {
//       t.exports = "/images/10.png?936a4396f47fa608c0804362e90b4e1d";
//     },
//     167: function (t, e) {
//       t.exports = "/images/11.png?71aaa62d5657dddad5081d63da1f91d1";
//     },
//     172: function (t, e, n) {
//       t.exports = n(372);
//     },
//     293: function (t, e) {
//       var n;
//       (window.NuHiepScript =
//         ((n = function () {
//           if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
//             var t = document.createElement("style");
//             t.appendChild(
//               document.createTextNode("@-ms-viewport{width:auto!important}")
//             ),
//               document.querySelector("head").appendChild(t);
//           }
//         }),
//         {
//           init: function () {
//             n(),
//               $(".js-slider").each(function () {
//                 var t = $(this),
//                   e = t.find('[data-type="poster"]'),
//                   n = t.find('[data-type="info"]'),
//                   r = new Swiper(n, {
//                     spaceBetween: 0,
//                     fadeEffect: {
//                       crossFade: !1,
//                     },
//                     effect: "fade",
//                     slidesPerView: 1,
//                   });
//                 new Swiper(e, {
//                   navigation: {
//                     nextEl: e.find(".swiper-button-next"),
//                     prevEl: e.find(".swiper-button-prev"),
//                   },
