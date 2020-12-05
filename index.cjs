var __defineProperty = Object.defineProperty;
var __markAsModule = (target) => {
  return __defineProperty(target, "__esModule", {value: true});
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defineProperty(target, name, {get: all[name], enumerable: true});
};

// translate.js
const corners = {
  t: ["top-left", "top-right"],
  r: ["top-right", "bottom-right"],
  b: ["bottom-left", "bottom-right"],
  l: ["bottom-left", "top-left"],
  tl: ["top-left"],
  tr: ["top-right"],
  bl: ["bottom-left"],
  br: ["bottom-right"]
};
const edges = {
  t: ["top"],
  r: ["right"],
  b: ["bottom"],
  l: ["left"],
  y: ["top", "bottom"],
  x: ["left", "right"]
};
const helper = (xs) => ([x, position, y], val) => xs[position].reduce((a2, b) => ({
  ...a2,
  [[x, b, y].filter(Boolean).join("-")]: val
}), {});
const cornersHelper = helper(corners);
const edgesHelper = helper(edges);
const colorHelper = (colors, color, shade, opacity) => {
  const base = colors[color];
  const colorValue = base && (typeof base === "string" ? base : shade ? base[shade] : base["default"]);
  return `rgba(${hexToRgb(colorValue)},var(${opacity}))`;
};
const hexToRgb = (color) => {
  if (!/^#[0-9a-fA-F]{8}$|#[0-9a-fA-F]{6}$|#[0-9a-fA-F]{4}$|#[0-9a-fA-F]{3}$/i.test(color))
    return void 0;
  let r2, g, b;
  if (color.length <= 4) {
    r2 = parseInt(color[1] + color[1], 16);
    g = parseInt(color[2] + color[2], 16);
    b = parseInt(color[3] + color[3], 16);
  } else {
    r2 = parseInt(color.substr(1, 2), 16);
    g = parseInt(color.substr(3, 2), 16);
    b = parseInt(color.substr(5, 2), 16);
  }
  return `${r2},${g},${b}`;
};
const translate = (theme3) => (str) => {
  let x;
  let n2 = "";
  if (str[0] === "-") {
    n2 = "-";
    str = str.slice(1);
  }
  let i = str.split("-");
  let out = {};
  switch (i.length) {
    case 1:
      switch (i[0]) {
        case "hidden":
          out["display"] = "none";
          break;
        case "inline":
        case "block":
        case "flex":
        case "grid":
        case "table":
          out["display"] = i[0];
          break;
        case "static":
        case "fixed":
        case "absolute":
        case "relative":
        case "sticky":
          out["position"] = i[0];
          break;
        case "visible":
          out["visibility"] = i[0];
          break;
        case "invisible":
          out["visibility"] = "hidden";
          break;
        case "antialiased":
          out = {
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale"
          };
          break;
        case "italic":
          out["font-style"] = i[0];
          break;
        case "underline":
          out["text-decoration"] = i[0];
          break;
        case "uppercase":
        case "lowercase":
        case "capitalize":
          out["text-transform"] = i[0];
          break;
        case "truncate":
          out = {
            overflow: "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap"
          };
          break;
        case "transition":
          out["transition-property"] = "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform";
          break;
        case "resize":
          out["resize"] = "both";
          break;
        case "rounded":
          out["border-radius"] = theme3.borderRadius["default"];
          break;
        case "clearfix":
          out["::after"] = {
            content: '""',
            display: "table",
            clear: "both"
          };
          break;
        case "border":
          out["border-width"] = theme3.borderWidth["default"];
          break;
        case "shadow":
          out["box-shadow"] = theme3.boxShadow["default"];
          break;
      }
      break;
    case 2:
      switch (i[0]) {
        case "normal":
          if (i[1] === "case")
            out["text-transform"] = "none";
          break;
        case "flow":
          if (i[1] === "root")
            out["display"] = "flow-root";
          break;
        case "inline":
          switch (i[1]) {
            case "block":
            case "flex":
            case "grid":
              out["display"] = `${i[0]}-${i[1]}`;
              break;
          }
          break;
        case "table":
          switch (i[1]) {
            case "caption":
            case "cell":
            case "column":
            case "row":
              out["display"] = `${i[0]}-${i[1]}`;
              break;
            case "auto":
            case "fixed":
              out[`${i[0]}-layout`] = i[1];
              break;
          }
          break;
        case "object":
          switch (i[1]) {
            case "contain":
            case "cover":
            case "fill":
            case "none":
              out[`${i[0]}-fit`] = i[1];
              break;
            default:
              out[`${i[0]}-position`] = i[1];
              break;
          }
          break;
        case "inset":
          switch (i[1]) {
            case "0":
            case "auto":
              out = {top: i[1], right: i[1], bottom: i[1], left: i[1]};
              break;
          }
          break;
        case "flex":
          switch (i[1]) {
            case "row":
              out[`flex-direction`] = i[1];
              break;
            case "col":
              out[`flex-direction`] = "column";
              break;
            case "wrap":
              out[`flex-wrap`] = i[1];
              break;
            case "1":
            case "auto":
            case "initial":
            case "none":
              out["flex"] = theme3.flex[i[1]];
              break;
            case "grow":
              out[`flex-grow`] = theme3.flexGrow["default"];
              break;
            case "shrink":
              out[`flex-shrink`] = theme3.flexShrink["default"];
              break;
          }
          break;
        case "items":
          switch (i[1]) {
            case "start":
            case "end":
              out[`align-items`] = `flex-${i[1]}`;
              break;
            default:
              out[`align-items`] = i[1];
              break;
          }
          break;
        case "content":
          switch (i[1]) {
            case "start":
            case "end":
              out[`align-content`] = `flex-${i[1]}`;
              break;
            case "between":
            case "around":
              out[`align-content`] = `space-${i[1]}`;
              break;
            default:
              out[`align-content`] = i[1];
              break;
          }
          break;
        case "justify":
          switch (i[1]) {
            case "start":
            case "end":
              out[`justify-content`] = `flex-${i[1]}`;
              break;
            case "between":
            case "around":
              out[`justify-content`] = `space-${i[1]}`;
              break;
            default:
              out[`justify-content`] = i[1];
              break;
          }
          break;
        case "self":
          switch (i[1]) {
            case "start":
            case "end":
              out[`align-self`] = `flex-${i[1]}`;
              break;
            default:
              out[`align-self`] = i[1];
              break;
          }
          break;
        case "order":
          out["order"] = theme3.order[i[1]];
          break;
        case "col":
          if (i[1] === "auto")
            out["grid-column"] = i[1];
          break;
        case "row":
          if (i[1] === "auto")
            out["grid-row"] = i[1];
          break;
        case "w":
          out["width"] = theme3.width[i[1]];
          break;
        case "h":
          out["height"] = theme3.height[i[1]];
          break;
        case "text":
          switch (i[1]) {
            case "left":
            case "center":
            case "right":
            case "justify":
              out[`text-align`] = i[1];
              break;
            case "current":
              out["color"] = "currentColor";
              break;
            default:
              if (x = theme3.fontSize[i[1]])
                out["font-size"] = x;
              else
                out = {
                  "--ow-text-opacity": 1,
                  color: colorHelper(theme3.colors, i[1], void 0, "--ow-text-opacity")
                };
              break;
          }
          break;
        case "subpixel":
          if (i[1] === "antialiased")
            out = {
              "-webkit-font-smoothing": "auto",
              "-moz-osx-font-smoothing": "auto"
            };
          break;
        case "not":
          if (i[1] === "italic")
            out["font-style"] = "normal";
          break;
        case "list":
          switch (i[1]) {
            case "inside":
            case "outside":
              out[`list-style-position`] = i[1];
              break;
            default:
              out[`list-style-type`] = i[1];
              break;
          }
          break;
        case "no":
          if (i[1] === "underline")
            out["text-decoration"] = "none";
          break;
        case "line":
          if (i[1] === "through")
            out["text-decoration"] = "line-through";
          break;
        case "break":
          switch (i[1]) {
            case "normal":
              out["word-break"] = i[1];
              out["overflow-wrap"] = i[1];
              break;
            case "words":
              out["overflow-wrap"] = "break-word";
              break;
            case "all":
              out["word-break"] = "break-all";
              break;
          }
          break;
        case "bg":
          switch (i[1]) {
            case "fixed":
            case "local":
            case "scroll":
              out["background-attachment"] = i[1];
              break;
            case "bottom":
            case "center":
            case "left":
            case "right":
            case "top":
              out["background-position"] = i[1];
              break;
            case "repeat":
              out[`background-${i[1]}`] = i[1];
              break;
            case "auto":
            case "cover":
            case "contain":
              out["background-size"] = i[1];
              break;
            case "current":
              out["background-color"] = "currentColor";
              break;
            default:
              out = {
                "--ow-bg-opacity": 1,
                "background-color": colorHelper(theme3.colors, i[1], void 0, "--ow-bg-opacity")
              };
              break;
          }
          break;
        case "border":
          switch (i[1]) {
            case "t":
            case "r":
            case "b":
            case "l":
              out = edgesHelper(["border", i[1], "width"], theme3.borderWidth["default"]);
              break;
            case "solid":
            case "dashed":
            case "dotted":
            case "double":
            case "none":
              out[`border-style`] = i[1];
              break;
            case "collapse":
              out[`border-collapse`] = i[1];
              break;
            case "separate":
              out[`border-collapse`] = i[1];
              break;
            case "current":
              out[`border-color`] = "currentColor";
              break;
            default:
              if (x = theme3.borderWidth[i[1]])
                out["border-width"] = x;
              else
                out = {
                  "--ow-border-opacity": 1,
                  "border-color": colorHelper(theme3.colors, i[1], void 0, "--ow-border-opacity")
                };
              break;
          }
          break;
        case "shadow":
          out["box-shadow"] = theme3.boxShadow[i[1]];
          break;
        case "opacity":
          out["opacity"] = theme3.opacity[i[1]];
          break;
        case "transition":
          out[`transition-property`] = theme3.transitionProperty[i[1]];
          break;
        case "ease":
          out["transition-timing-function"] = theme3.transitionTimingFunction[i[1]];
          break;
        case "appearance":
          if (i[1] === "none")
            out[i[0]] = i[1];
          break;
        case "outline":
          if (i[1] === "none")
            out[i[0]] = "0";
          break;
        case "resize":
          switch (i[1]) {
            case "x":
              out["resize"] = "vertical";
              break;
            case "y":
              out["resize"] = "horizontal";
              break;
            case "none":
              out["resize"] = i[1];
              break;
          }
          break;
        case "fill":
          if (i[1] === "current")
            out["fill"] = theme3.fill[i[1]];
          break;
        case "stroke":
          i[1] === "current" ? out["stroke"] = theme3.stroke["current"] : out["stroke-width"] = theme3.strokeWidth[i[1]];
          break;
        case "sr":
          if (i[1] === "only")
            out = {
              width: "1px",
              height: "1px",
              padding: "0",
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              "border-width": "0"
            };
          break;
        case "box":
          out["box-sizing"] = `${i[1]}-box`;
          break;
        case "float":
        case "clear":
        case "overflow":
          out[i[0]] = i[1];
          break;
        case "scrolling":
          out[`-webkit-overflow-scrolling`] = i[1];
          break;
        case "z":
          out["z-index"] = theme3.zIndex[i[1]];
          break;
        case "gap":
          out["gap"] = theme3.gap[i[1]];
          break;
        case "p":
          out["padding"] = theme3.padding[i[1]];
          break;
        case "py":
        case "px":
        case "pt":
        case "pr":
        case "pb":
        case "pl":
          out = edgesHelper(["padding", i[0][1]], theme3.padding[i[1]]);
          break;
        case "m":
          out["margin"] = `${n2}${theme3.margin[i[1]]}`;
          break;
        case "my":
        case "mx":
        case "mt":
        case "mr":
        case "mb":
        case "ml":
          out = edgesHelper(["margin", i[0][1]], `${n2}${theme3.margin[i[1]]}`);
          break;
        case "font":
          if (x = theme3.fontFamily[i[1]])
            out["font-family"] = x;
          if (x = theme3.fontWeight[i[1]])
            out["font-weight"] = x;
          break;
        case "tracking":
          out["letter-spacing"] = theme3.letterSpacing[i[1]];
          break;
        case "leading":
          out["line-height"] = theme3.lineHeight[i[1]];
          break;
        case "align":
          out[`vertical-align`] = i[1];
          break;
        case "whitespace":
          out["white-space"] = i[1];
          break;
        case "rounded":
          switch (i[1]) {
            case "t":
            case "r":
            case "b":
            case "l":
            case "tl":
            case "tr":
            case "bl":
            case "br":
              out = cornersHelper(["border", i[1], "radius"], theme3.borderRadius["default"]);
              break;
            default:
              out["border-radius"] = theme3.borderRadius[i[1]];
              break;
          }
          break;
        case "duration":
          out["transition-duration"] = `${theme3.transitionDuration[i[1]]}`;
          break;
        case "delay":
          out["transition-delay"] = `${theme3.transitionDelay[i[1]]}`;
          break;
        case "scale":
          out["transform"] = `scale(${theme3.scale[i[1]]})`;
          break;
        case "rotate":
          out["transform"] = `rotate(${n2 ? "-" : ""}${theme3.rotate[i[1]]})`;
          break;
        case "origin":
          out["transform-origin"] = i[1];
          break;
        case "cursor":
          out["cursor"] = i[1];
          break;
        case "select":
          out["user-select"] = i[1];
          break;
        case "placeholder":
          out["::placeholder"] = {
            "--ow-placeholder-opacity": 1,
            color: colorHelper(theme3.placeholderColor, i[1], void 0, "--ow-placeholder-opacity")
          };
          break;
        case "divide":
          switch (i[1]) {
            case "x":
            case "y":
              out["selectors"] = {
                "& > * + *": {
                  [`border-${i[1] === "x" ? "left" : "top"}-width`]: theme3.divideWidth["default"]
                }
              };
              break;
            case "solid":
            case "dashed":
            case "dotted":
            case "double":
            case "none":
              out["selectors"] = {
                "& > * + *": {
                  "border-style": i[1]
                }
              };
              break;
            default:
              out["selectors"] = {
                "& > * + *": {
                  "--ow-divide-opacity": 1,
                  "border-color": colorHelper(theme3.colors, i[1], void 0, "--ow-divide-opacity")
                }
              };
              break;
          }
          break;
        case "top":
        case "right":
        case "bottom":
        case "left":
          out[i[0]] = i[1];
          break;
      }
      break;
    case 3:
      switch (i[0]) {
        case "divide":
          switch (i[1]) {
            case "x":
            case "y":
              out["selectors"] = {
                "& > * + *": {
                  [`border-${i[1] === "x" ? "left" : "top"}-width`]: theme3.divideWidth[i[2]]
                }
              };
              break;
            default:
              out["selectors"] = {
                "& > * + *": {
                  "--ow-divide-opacity": 1,
                  "border-color": colorHelper(theme3.colors, i[1], i[2], "--ow-divide-opacity")
                }
              };
              break;
          }
          break;
        case "placeholder":
          switch (i[1]) {
            case "opacity":
              out["::placeholder"] = {
                "--ow-placeholder-opacity": theme3.opacity[i[2]]
              };
              break;
            default:
              out["::placeholder"] = {
                "--ow-placeholder-opacity": 1,
                color: colorHelper(theme3.placeholderColor, i[1], i[2], "--ow-placeholder-opacity")
              };
          }
          break;
        case "table":
          out["display"] = `${i[0]}-${i[1]}-${i[2]}`;
          break;
        case "object":
          i[1] === "scale" ? out["object-fit"] = `${i[1]}-${i[2]}` : out["object-position"] = `${i[1]} ${i[2]}`;
          break;
        case "inset":
          switch (i[1]) {
            case "y":
              out = {top: i[2], bottom: i[2]};
              break;
            case "x":
              out = {left: i[2], right: i[2]};
              break;
          }
          break;
        case "flex":
          switch (i[1]) {
            case "row":
              if (i[2] === "reverse")
                out[`flex-direction`] = `row-${i[2]}`;
              break;
            case "col":
              if (i[2] === "reverse")
                out[`flex-direction`] = `column-${i[2]}`;
              break;
            case "no":
              if (i[2] === "wrap")
                out[`flex-wrap`] = `${i[1]}${i[2]}`;
              break;
            case "wrap":
              if (i[2] === "reverse")
                out[`flex-wrap`] = `${i[1]}-${i[2]}`;
              break;
            case "grow":
            case "shrink":
              if (i[2] === "0")
                out[`flex-${i[1]}`] = i[2];
              break;
          }
          break;
        case "grid":
          switch (i[1]) {
            case "cols":
              out[`grid-template-columns`] = i[2] === "none" ? i[2] : `repeat(${i[2]}, minmax(0, 1fr))`;
              break;
            case "rows":
              out[`grid-template-rows`] = i[2] === "none" ? i[2] : `repeat(${i[2]}, minmax(0, 1fr))`;
              break;
            case "flow":
              out["grid-auto-flow"] = i[2];
              break;
          }
          break;
        case "min":
          switch (i[1]) {
            case "w":
              out["min-width"] = theme3.minWidth[i[2]];
              break;
            case "h":
              out["min-height"] = theme3.minHeight[i[2]];
              break;
          }
          break;
        case "max":
          switch (i[1]) {
            case "w":
              out["max-width"] = theme3.maxWidth[i[2]];
              break;
            case "h":
              out["max-height"] = theme3.maxHeight[i[2]];
              break;
          }
          break;
        case "whitespace":
          if (i[1] + i[2] === "nowrap")
            out["white-space"] = "nowrap";
          else
            out["white-space"] = `${i[1]}-${i[2]}`;
          break;
        case "bg":
          switch (i[1]) {
            case "no":
              if (i[2] === "repeat")
                out[`background-repeat`] = `${i[1]}-${i[2]}`;
              break;
            case "repeat":
              switch (i[2]) {
                case "x":
                case "y":
                  out[`background-repeat`] = `${i[1]}-${i[2]}`;
                  break;
                default:
                  out[`background-repeat`] = i[2];
                  break;
              }
              break;
            case "left":
              out["background-position"] = `${i[1]} ${i[2]}`;
              break;
            case "right":
              out["background-position"] = `${i[1]} ${i[2]}`;
              break;
            case "opacity":
              out["--ow-bg-opacity"] = theme3.opacity[i[2]];
              break;
            default:
              out = {
                "--ow-bg-opacity": 1,
                "background-color": colorHelper(theme3.colors, i[1], i[2], "--ow-bg-opacity")
              };
              break;
          }
          break;
        case "ease":
          if (i[1] + i[2] === "inout")
            out["transition-timing-function"] = "cubic-bezier(0.4, 0, 0.2, 1)";
          break;
        case "not":
          if (i[1] + i[2] === "sronly")
            out = {
              position: "static",
              width: "auto",
              height: "auto",
              padding: "0",
              margin: "0",
              overflow: "visible",
              clip: "auto",
              "white-space": "normal"
            };
          break;
        case "overflow":
          out[`${i[0]}-${i[1]}`] = i[2];
          break;
        case "col":
          switch (i[1]) {
            case "span":
              out["grid-column"] = `span ${i[2]} / span ${i[2]}`;
              break;
            case "start":
            case "end":
              out[`grid-column-${i[1]}`] = i[2];
              break;
            case "gap":
              out["column-gap"] = theme3.spacing[i[2]];
              break;
          }
          break;
        case "row":
          switch (i[1]) {
            case "span":
              out[`grid-row`] = `span ${i[2]} / span ${i[2]}`;
              break;
            case "start":
            case "end":
              out[`grid-row-${i[1]}`] = i[2];
              break;
          }
          break;
        case "rounded":
          switch (i[1]) {
            case "t":
            case "r":
            case "b":
            case "l":
            case "tl":
            case "tr":
            case "bl":
            case "br":
              out = cornersHelper(["border", i[1], "radius"], theme3.borderRadius[i[2]]);
              break;
          }
          break;
        case "border":
          switch (i[1]) {
            case "t":
            case "r":
            case "b":
            case "l":
              out = edgesHelper(["border", i[1], "width"], theme3.borderWidth[i[2]]);
              break;
            case "opacity":
              out["--ow-border-opacity"] = theme3.opacity[i[2]];
              break;
            default:
              out = {
                "--ow-border-opacity": 1,
                "border-color": colorHelper(theme3.colors, i[1], i[2], "--ow-border-opacity")
              };
              break;
          }
          break;
        case "scale":
          out["transform"] = `scale${i[1].toUpperCase()}(${theme3.scale[i[2]]})`;
          break;
        case "translate":
          out["transform"] = `${i[0]}${i[1].toUpperCase()}(${n2}${theme3.spacing[i[2]]})`;
          break;
        case "skew":
          out["transform"] = `${i[0]}${i[1].toUpperCase()}(${n2}${theme3.skew[i[2]]})`;
          break;
        case "pointer":
          if (i[1] === "events")
            out[`pointer-events`] = i[2];
          break;
        case "text":
          switch (i[1]) {
            case "opacity":
              out["--ow-text-opacity"] = theme3.opacity[i[2]];
              break;
            default:
              out = {
                "--ow-text-opacity": 1,
                color: colorHelper(theme3.colors, i[1], i[2], "--ow-text-opacity")
              };
              break;
          }
          break;
        case "align":
          out[`vertical-align`] = `${i[1]}-${i[2]}`;
          break;
        case "origin":
          out[`transform-origin`] = `${i[1]} ${i[2]}`;
          break;
        case "cursor":
          out["cursor"] = `${i[1]}-${i[2]}`;
          break;
        case "space":
          out["selectors"] = {
            "& > * + *": {
              [`margin-${i[1] === "x" ? "left" : "top"}`]: `${n2}${theme3.margin[i[2]]}`
            }
          };
          break;
      }
      break;
    case 4:
      switch (i[0]) {
        case "grid":
          if (i[1] === "flow") {
            if (i[2] === "col")
              out[`grid-auto-flow`] = `column ${i[3]}`;
            if (i[2] === "row")
              out[`grid-auto-flow`] = `row ${i[3]}`;
          }
          break;
        case "max":
          if (i[1] + i[2] === "wscreen")
            out["max-width"] = theme3.maxWidth[`screen-${i[3]}`];
          break;
      }
      break;
  }
  return out;
};
var translate_default = translate;

// theme.js
const globals = {
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
  },
  colors: {
    transparent: "#00000000",
    current: "currentColor",
    black: "#000",
    white: "#fff",
    gray: {
      100: "#F7FAFC",
      200: "#EDF2F7",
      300: "#E2E8F0",
      400: "#CBD5E0",
      500: "#A0AEC0",
      600: "#718096",
      700: "#4A5568",
      800: "#2D3748",
      900: "#1A202C"
    },
    red: {
      100: "#FFF5F5",
      200: "#FED7D7",
      300: "#FEB2B2",
      400: "#FC8181",
      500: "#F56565",
      600: "#E53E3E",
      700: "#C53030",
      800: "#9B2C2C",
      900: "#742A2A"
    },
    orange: {
      100: "#FFFAF0",
      200: "#FEEBC8",
      300: "#FBD38D",
      400: "#F6AD55",
      500: "#ED8936",
      600: "#DD6B20",
      700: "#C05621",
      800: "#9C4221",
      900: "#7B341E"
    },
    yellow: {
      100: "#FFFFF0",
      200: "#FEFCBF",
      300: "#FAF089",
      400: "#F6E05E",
      500: "#ECC94B",
      600: "#D69E2E",
      700: "#B7791F",
      800: "#975A16",
      900: "#744210"
    },
    green: {
      100: "#F0FFF4",
      200: "#C6F6D5",
      300: "#9AE6B4",
      400: "#68D391",
      500: "#48BB78",
      600: "#38A169",
      700: "#2F855A",
      800: "#276749",
      900: "#22543D"
    },
    teal: {
      100: "#E6FFFA",
      200: "#B2F5EA",
      300: "#81E6D9",
      400: "#4FD1C5",
      500: "#38B2AC",
      600: "#319795",
      700: "#2C7A7B",
      800: "#285E61",
      900: "#234E52"
    },
    blue: {
      100: "#EBF8FF",
      200: "#BEE3F8",
      300: "#90CDF4",
      400: "#63B3ED",
      500: "#4299E1",
      600: "#3182CE",
      700: "#2B6CB0",
      800: "#2C5282",
      900: "#2A4365"
    },
    indigo: {
      100: "#EBF4FF",
      200: "#C3DAFE",
      300: "#A3BFFA",
      400: "#7F9CF5",
      500: "#667EEA",
      600: "#5A67D8",
      700: "#4C51BF",
      800: "#434190",
      900: "#3C366B"
    },
    purple: {
      100: "#FAF5FF",
      200: "#E9D8FD",
      300: "#D6BCFA",
      400: "#B794F4",
      500: "#9F7AEA",
      600: "#805AD5",
      700: "#6B46C1",
      800: "#553C9A",
      900: "#44337A"
    },
    pink: {
      100: "#FFF5F7",
      200: "#FED7E2",
      300: "#FBB6CE",
      400: "#F687B3",
      500: "#ED64A6",
      600: "#D53F8C",
      700: "#B83280",
      800: "#97266D",
      900: "#702459"
    }
  },
  spacing: {
    px: "1px",
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
    40: "10rem",
    48: "12rem",
    56: "15rem",
    64: "16rem"
  },
  opacity: {
    0: "0",
    25: "0.25",
    50: "0.5",
    75: "0.75",
    100: "1"
  },
  duration: {
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1e3: "1000ms"
  },
  borderWidth: {
    default: "1px",
    0: "0",
    2: "2px",
    4: "4px",
    8: "8px"
  }
};
const theme = ({
  screens,
  colors,
  spacing,
  opacity,
  duration,
  borderWidth
}) => ({
  screens,
  colors,
  spacing,
  backgroundColor: colors,
  gradientColorStops: colors,
  backgroundImage: {
    none: "none",
    "gradient-to-t": "linear-gradient(to top, var(--gradient-color-stops))",
    "gradient-to-tr": "linear-gradient(to top right, var(--gradient-color-stops))",
    "gradient-to-r": "linear-gradient(to right, var(--gradient-color-stops))",
    "gradient-to-br": "linear-gradient(to bottom right, var(--gradient-color-stops))",
    "gradient-to-b": "linear-gradient(to bottom, var(--gradient-color-stops))",
    "gradient-to-bl": "linear-gradient(to bottom left, var(--gradient-color-stops))",
    "gradient-to-l": "linear-gradient(to left, var(--gradient-color-stops))",
    "gradient-to-tl": "linear-gradient(to top left, var(--gradient-color-stops))"
  },
  backgroundOpacity: opacity,
  backgroundSize: {
    auto: "auto",
    cover: "cover",
    contain: "contain"
  },
  borderColor: colors,
  borderOpacity: opacity,
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    default: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px"
  },
  borderWidth,
  boxShadow: {
    xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
    none: "none"
  },
  divideColor: colors,
  divideOpacity: opacity,
  divideWidth: borderWidth,
  fill: {
    current: "currentColor"
  },
  flex: {
    1: "1 1 0%",
    auto: "1 1 auto",
    initial: "0 1 auto",
    none: "none"
  },
  flexGrow: {
    0: "0",
    default: "1"
  },
  flexShrink: {
    0: "0",
    default: "1"
  },
  fontFamily: {
    sans: '"Lato", Roboto, "Helvetica Neue", "Segoe UI", sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem"
  },
  fontWeight: {
    hairline: "100",
    thin: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900"
  },
  fontMetrics: {
    "Segoe UI": {
      capHeight: 1455,
      ascent: 2200,
      descent: -480,
      lineGap: 0,
      unitsPerEm: 2048
    },
    Roboto: {
      capHeight: 1500,
      ascent: 1900,
      descent: -500,
      lineGap: 0,
      unitsPerEm: 2048
    },
    "Helvetica Neue": {
      capHeight: 1433,
      ascent: 1974,
      descent: -426,
      lineGap: 0,
      unitsPerEm: 2048
    },
    Lato: {
      capHeight: 1433,
      ascent: 1974,
      descent: -426,
      lineGap: 0,
      unitsPerEm: 2e3
    }
  },
  height: {
    auto: "auto",
    ...spacing,
    full: "100%",
    screen: "100vh"
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  },
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem"
  },
  margin: {
    auto: "auto",
    ...spacing
  },
  maxHeight: {
    full: "100%",
    screen: "100vh"
  },
  maxWidth: {
    none: "none",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    full: "100%",
    ...Object.entries(screens).reduce((xs, [k, v]) => ({...xs, [`screen-${k}`]: v}), {})
  },
  minHeight: {
    0: "0",
    full: "100%",
    screen: "100vh"
  },
  minWidth: {
    0: "0",
    full: "100%"
  },
  opacity,
  order: {
    first: "-9999",
    last: "9999",
    none: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12"
  },
  padding: spacing,
  placeholderColor: colors,
  placeholderOpacity: opacity,
  space: spacing,
  stroke: {
    current: "currentColor"
  },
  strokeWidth: {
    0: "0",
    1: "1",
    2: "2"
  },
  textColor: colors,
  textOpacity: opacity,
  width: {
    auto: "auto",
    ...spacing,
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%",
    "1/6": "16.666667%",
    "2/6": "33.333333%",
    "3/6": "50%",
    "4/6": "66.666667%",
    "5/6": "83.333333%",
    "1/12": "8.333333%",
    "2/12": "16.666667%",
    "3/12": "25%",
    "4/12": "33.333333%",
    "5/12": "41.666667%",
    "6/12": "50%",
    "7/12": "58.333333%",
    "8/12": "66.666667%",
    "9/12": "75%",
    "10/12": "83.333333%",
    "11/12": "91.666667%",
    full: "100%",
    screen: "100vw"
  },
  zIndex: {
    auto: "auto",
    0: "0",
    10: "10",
    20: "20",
    30: "30",
    40: "40",
    50: "50"
  },
  gap: spacing,
  scale: {
    0: "0",
    50: ".5",
    75: ".75",
    90: ".9",
    95: ".95",
    100: "1",
    105: "1.05",
    110: "1.1",
    125: "1.25",
    150: "1.5"
  },
  rotate: {
    0: "0deg",
    45: "45deg",
    90: "90deg",
    180: "180deg"
  },
  translate: {
    ...spacing,
    "-full": "-100%",
    "-1/2": "-50%",
    "1/2": "50%",
    full: "100%"
  },
  skew: {
    0: "0",
    3: "3deg",
    6: "6deg",
    12: "12deg"
  },
  transitionProperty: {
    none: "none",
    all: "all",
    default: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
    colors: "background-color, border-color, color, fill, stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform"
  },
  transitionTimingFunction: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
  },
  transitionDuration: duration,
  transitionDelay: duration,
  animation: {
    none: "none",
    spin: "spin 1s linear infinite",
    ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    bounce: "bounce 1s infinite"
  },
  keyframes: {
    spin: {
      to: {transform: "rotate(360deg)"}
    },
    ping: {
      "75%, 100%": {transform: "scale(2)", opacity: "0"}
    },
    pulse: {
      "50%": {opacity: ".5"}
    },
    bounce: {
      "0%, 100%": {
        transform: "translateY(-25%)",
        animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
      },
      "50%": {
        transform: "none",
        animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
      }
    }
  }
});
var theme_default = theme;

// util/merge.js
const isObject = (obj) => obj && typeof obj === "object";
const merge = (...objects) => {
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];
      if (isObject(pVal) && isObject(oVal)) {
        prev[key] = merge(pVal, oVal);
      } else {
        prev[key] = key === "transform" && pVal ? [oVal, pVal].join(" ") : oVal;
      }
    });
    return prev;
  }, {});
};
var merge_default = merge;

// util/normalize.js
const handleVariantGrouping = (arr) => {
  let prefix = [];
  return arr.reduce((acc, x) => {
    const start = x.match(/(.*:)+\(/);
    const end = x.match(/\)/g) || [];
    if (start) {
      prefix = prefix.concat(start[1].split("("));
      x = start.input.replace(start[0], "");
    }
    x = prefix.join("") + x;
    if (end.length > 0) {
      end.forEach(() => {
        x = x.slice(0, -1);
        prefix.pop();
      });
    }
    return x.endsWith(":") ? acc : [...acc, x];
  }, []);
};
var normalize_default = (strings, ...values) => handleVariantGrouping((typeof strings === "string" ? strings : Array.isArray(strings) ? strings.reduce((str, rule, i) => str += [rule || "", values[i] || ""].join(" "), "") : Object.entries(strings).reduce((str, [rule, val]) => str = [str, val ? rule : ""].join(" "), "")).replace(/\s\s+/g, " ").trim().split(" "));

// vendor/otion.js
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= k >>> 24;
    h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var t = /^(br|hy|us|wr|text-si|scroll-snap-t)/;
var e = /^(ap|us|tab-|border-e|margin-e|margin-s|padding-e|padding-s|border-sta)/;
var r = /^(ap|br|hy|us|wr|mas|colu|clip-|box-de|font-k|text-e|font-fe|shape-i|text-or|text-si|border-e|margin-e|margin-s|padding-e|padding-s|border-sta|background-cl|scroll-snap-t|text-decoration-)/;
var s = /^(pos|background-cl)/;
var a = {};
var n = function(s2) {
  return a[s2] ? a[s2] : a[s2] = 1 * t.test(s2) | 2 * e.test(s2) | 4 * r.test(s2);
};
var o = function(t2, e2) {
  return s.test(t2) ? e2.replace(/(sticky|text)/, "-webkit-$1, $1") : e2;
};
const isDeno = typeof window !== "undefined" && window.Deno;
const isBrowser = isDeno ? false : typeof window !== "undefined";
const isDev = isDeno || isBrowser ? false : process.env.NODE_ENV !== "production";
const STYLE_ELEMENT_ID = "__otion";
function getStyleElement() {
  let el = document.getElementById(STYLE_ELEMENT_ID);
  if (el)
    return el;
  el = document.createElement("style");
  el.id = STYLE_ELEMENT_ID;
  return document.head.appendChild(el);
}
function CSSOMInjector({nonce, target = getStyleElement().sheet}) {
  target.ownerNode.nonce = nonce;
  return {
    sheet: target,
    insert(rule, index) {
      try {
        return target.insertRule(rule, index);
      } catch {
        return -1;
      }
    }
  };
}
function DOMInjector({nonce, target = getStyleElement()}) {
  target.nonce = nonce;
  return {
    sheet: target.sheet,
    insert(rule, index) {
      target.insertBefore(document.createTextNode(rule), target.childNodes[index]);
      return index;
    }
  };
}
const NoOpInjector = {
  insert() {
    return 0;
  }
};
function minifyValue(value) {
  return value.trim().replace(/\s+/g, " ");
}
function minifyCondition(condition) {
  return minifyValue(condition).replace(/([([]) | ([)\]])| ?(:) ?/g, "$1$2$3");
}
const PROPERTY_ACCEPTS_UNITLESS_VALUES = /^(-|f[lo].*?[^se]$|g.{6,}[^ps]$|z|o[pr]|(-w.{6})?li.*?(t|mp)$|an|(bo|s).{5}im|sca|m.{7}[ds]|ta|c.*?[st]$|wido|ini)/;
const PROPERTY_PRECEDENCE_CORRECTION_GROUPS = /^(?:(border-(?!w|c|sty)|[tlbr].{2,4}m?$|c.{7}$)|([fl].{5}l|g.{8}$|pl))/;
const PRECEDENCES_BY_PSEUDO_CLASS = new Map([
  [
    "nk",
    1
  ],
  [
    "sited",
    2
  ],
  [
    "pty",
    3
  ],
  [
    "cus-w",
    4
  ],
  [
    "ver",
    5
  ],
  [
    "cus",
    6
  ],
  [
    "cus-v",
    7
  ],
  [
    "tive",
    8
  ],
  [
    "sable",
    9
  ]
]);
const PSEUDO_CLASS_PRECEDENCE_GROUP_COUNT = 9;
function rulePrecedence(property, pseudoClass, isConditionalRule) {
  let precedence = 0;
  const isCustomProperty = property[1] === "-";
  if (!isCustomProperty) {
    const unprefixedProperty = property[0] === "-" ? property.slice(property.indexOf("-", 1)) + 1 : property;
    const matches = PROPERTY_PRECEDENCE_CORRECTION_GROUPS.exec(unprefixedProperty);
    precedence = (matches ? +!!matches[1] || -!!matches[2] : 0) + 1;
    let position = 1;
    while (position = unprefixedProperty.indexOf("-", position) + 1) {
      ++precedence;
    }
  }
  const conditionalPrecedenceGroupExistenceMultiplier = 2;
  precedence *= conditionalPrecedenceGroupExistenceMultiplier * (pseudoClass && PRECEDENCES_BY_PSEUDO_CLASS.get(pseudoClass.slice(3, 8)) || PSEUDO_CLASS_PRECEDENCE_GROUP_COUNT + 1);
  precedence += +isConditionalRule;
  return precedence;
}
const PRECEDENCE_GROUP_COUNT = 72;
function toHyphenLower(match) {
  return `-${match.toLowerCase()}`;
}
function createInstance() {
  let injector;
  let prefix;
  let ruleIndexesByIdentName;
  let nextRuleIndexesByPrecedenceGroup;
  function checkSetup() {
    if (!injector || !prefix || !ruleIndexesByIdentName) {
      throw new Error("On a custom otion instance, `setup()` must be called before usage.");
    }
  }
  function updatePrecedenceGroupRanges(fromPrecedence) {
    for (let i = fromPrecedence; i <= PRECEDENCE_GROUP_COUNT; ++i) {
      ++nextRuleIndexesByPrecedenceGroup[i];
    }
  }
  function hydrateScopedSubtree(cssRule, isConditionalRule) {
    if (cssRule.type === 1) {
      const {selectorText, style} = cssRule;
      const [, identName, pseudoClass] = /^..([0-9a-z]+)(:.*)?/.exec(selectorText);
      const property = style[0];
      if (property) {
        updatePrecedenceGroupRanges(rulePrecedence(property, pseudoClass, !!isConditionalRule));
      }
      ruleIndexesByIdentName.set(identName, ruleIndexesByIdentName.size);
    } else {
      hydrateScopedSubtree(cssRule.cssRules[0], true);
    }
  }
  function normalizeDeclaration(property, value) {
    const formattedValue = typeof value === "number" && !PROPERTY_ACCEPTS_UNITLESS_VALUES.test(property) ? `${value}px` : minifyValue(`${value}`);
    return prefix(property, formattedValue);
  }
  function serializeDeclarationList(property, value) {
    if (typeof value !== "object") {
      return normalizeDeclaration(property, value);
    }
    let cssText = "";
    value.forEach((fallbackValue) => {
      if (fallbackValue) {
        cssText += `;${normalizeDeclaration(property, fallbackValue)}`;
      }
    });
    return cssText.slice(1);
  }
  function decomposeToClassNames(rules, cssTextHead, cssTextTail, maxPrecedingConditionalRuleIndexesByPrecedenceGroup, classSelectorStartIndex) {
    let classNames = "";
    for (var key in rules) {
      const value = rules[key];
      if (value != null) {
        if (typeof value !== "object" || Array.isArray(value)) {
          const property = key.replace(/^ms|[A-Z]/g, toHyphenLower);
          const declarations = serializeDeclarationList(property, value);
          const className = `_${murmur2(cssTextHead + declarations)}`;
          const isConditionalRule = cssTextTail;
          let ruleIndex = ruleIndexesByIdentName.get(className);
          if (ruleIndex == null || isConditionalRule) {
            const precedence = rulePrecedence(property, classSelectorStartIndex == null ? "" : cssTextHead.slice(classSelectorStartIndex), !!isConditionalRule);
            if (ruleIndex == null || maxPrecedingConditionalRuleIndexesByPrecedenceGroup[precedence] > ruleIndex) {
              const scopeSelector = `.${className}`;
              injector.insert(`${cssTextHead.slice(0, classSelectorStartIndex) + scopeSelector + (classSelectorStartIndex != null ? `${cssTextHead.slice(classSelectorStartIndex).replace(/&/g, scopeSelector)}{` : "{")}${declarations}}${cssTextTail}`, nextRuleIndexesByPrecedenceGroup[precedence]);
              updatePrecedenceGroupRanges(precedence);
              ruleIndex = ruleIndexesByIdentName.size;
              ruleIndexesByIdentName.set(className, ruleIndex);
              if (isConditionalRule) {
                maxPrecedingConditionalRuleIndexesByPrecedenceGroup[precedence] = Math.max(maxPrecedingConditionalRuleIndexesByPrecedenceGroup[precedence], ruleIndex);
              }
            }
          }
          classNames += ` ${className}`;
        } else {
          let parentRuleHeads;
          let firstParentRuleHead = key[0] === ":" || key[0] === "@" || key[0] === "&" ? key : minifyCondition(key);
          let parentRuleTail = "";
          let scopeClassSelectorStartIndex = classSelectorStartIndex;
          if (scopeClassSelectorStartIndex == null) {
            if (firstParentRuleHead[0] === ":" || firstParentRuleHead[0] === "&") {
              scopeClassSelectorStartIndex = cssTextHead.length;
              parentRuleHeads = firstParentRuleHead.split(/,(?![^[]*?[^\\]["']\s*?\])/).map((singleSelector) => minifyValue(singleSelector).replace("&", ""));
            } else if (firstParentRuleHead === "selectors") {
              firstParentRuleHead = "";
            } else if (firstParentRuleHead[0] !== "@") {
              firstParentRuleHead += "{";
              parentRuleTail = "}";
            }
          }
          (parentRuleHeads || [firstParentRuleHead]).forEach((parentRuleHead) => {
            classNames += decomposeToClassNames(value, cssTextHead + parentRuleHead, parentRuleTail + cssTextTail, maxPrecedingConditionalRuleIndexesByPrecedenceGroup, scopeClassSelectorStartIndex);
          });
        }
      }
    }
    return classNames;
  }
  return {
    setup(options) {
      injector = options.injector || (isBrowser ? isDev ? DOMInjector({}) : CSSOMInjector({}) : NoOpInjector);
      prefix = options.prefix || ((property, value) => {
        const declaration = `${property}:${o(property, value)}`;
        let cssText = declaration;
        const flag = n(property);
        if (flag & 1)
          cssText += `;-ms-${declaration}`;
        if (flag & 2)
          cssText += `;-moz-${declaration}`;
        if (flag & 4)
          cssText += `;-webkit-${declaration}`;
        return cssText;
      });
      ruleIndexesByIdentName = new Map();
      nextRuleIndexesByPrecedenceGroup = new Uint16Array(PRECEDENCE_GROUP_COUNT);
    },
    hydrate() {
      if (isDev)
        checkSetup();
      const {cssRules} = injector.sheet;
      for (let i = 0, {length} = cssRules; i < length; ++i) {
        const cssRule = cssRules[i];
        if (cssRule.type === 7) {
          ruleIndexesByIdentName.set(cssRule.name, ruleIndexesByIdentName.size);
        } else {
          hydrateScopedSubtree(cssRule);
        }
      }
    },
    css(rules) {
      if (isDev)
        checkSetup();
      return decomposeToClassNames(rules, "", "", new Uint16Array(PRECEDENCE_GROUP_COUNT)).slice(1);
    },
    keyframes(rules) {
      if (isDev)
        checkSetup();
      let identName;
      return {
        toString() {
          if (!identName) {
            let cssText = "";
            for (var time in rules) {
              cssText += `${time}{`;
              const declarations = rules[time];
              for (var property in declarations) {
                const value = declarations[property];
                if (value != null) {
                  cssText += serializeDeclarationList(property, value);
                }
              }
              cssText += "}";
            }
            identName = `_${murmur2(cssText)}`;
            if (!ruleIndexesByIdentName.has(identName)) {
              injector.insert(`@keyframes ${identName}{${cssText}}`, ruleIndexesByIdentName.size);
              ruleIndexesByIdentName.set(identName, ruleIndexesByIdentName.size);
            }
          }
          return identName;
        }
      };
    }
  };
}
const defaultInstance = createInstance();
defaultInstance.setup({});
const setup = defaultInstance.setup;
const hydrate = defaultInstance.hydrate;
const css = defaultInstance.css;
const keyframes = defaultInstance.keyframes;

// index.js
__export(exports, {
  configure: () => configure,
  default: () => oceanwind_default,
  hydrate: () => hydrate,
  process: () => process2,
  setup: () => setup,
  themed: () => themed
});
const warn = (theme3) => (message) => {
  const msg = [message, new Error().stack.split("at ").pop()].join(" ");
  if (theme3.strict)
    throw msg;
  console.warn(msg);
};
const process2 = (theme3) => (strings, values) => {
  const rules = normalize_default(strings, values);
  const seen = {};
  const styles = rules.map((rule) => {
    if (seen[rule])
      warn(theme3)(`Duplicate declaration of "${rule}"`);
    seen[rule] = true;
    rule = rule.split(":");
    let directive = rule.pop();
    let variants = rule;
    let translation = translate_default(theme3)(directive);
    if (!Object.keys(translation)[0] || !Object.values(translation)[0]) {
      warn(theme3)(`No translation for "${directive}"`);
    }
    variants.reverse().forEach((variant) => {
      let size = theme3.screens[variant];
      if (size) {
        translation = {
          "@media": {[`(min-width: ${size})`]: translation}
        };
      } else
        translation = {[`:${variant}`]: translation};
    });
    return translation;
  });
  return merge_default(...styles);
};
const configure = (theme3) => merge_default(theme_default(merge_default(globals, theme3)), theme3);
const themed = (theme3 = {}) => {
  const processWithTheme = process2(configure(theme3));
  return (strings, ...values) => css(processWithTheme(strings, values));
};
var oceanwind_default = themed();
