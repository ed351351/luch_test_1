!(function (t) {
  "function" == typeof define && define.amd ? define(t) : t();
})(function () {
  "use strict";

  const m = [];
  function g() {
    for (let i = 0; i < m.length; i++) {
      const el = m[i];
      el && el.resize && el.resize();
    }
  }
  window.addEventListener("resize", g, !1);
  window.addEventListener("orientationchange", g, !1);
  class p extends HTMLElement {
    constructor() {
      super();
      this.created && this.created();
    }
    connectedCallback() {
      this.attached && this.attached();
      this._isConnected = !0;
      if (this.update || this.resize) m.push(this);
    }
    disconnectedCallback() {
      this.detached && this.detached();
      this._isConnected = !1;
      if (this.update || this.resize) {
        const idx = m.indexOf(this);
        if (idx > -1) m.splice(idx, 1);
      }
    }
  }
  (function t(e) {
    requestAnimationFrame(t);
    for (let i = 0; i < m.length; i++) {
      const el = m[i];
      el && el._isConnected && el.update && el.update(e);
    }
  })();
  var pt = {
    buffers: [],
    textures: [],
    frameBuffers: [],
    programs: [],
    trackProgram(t) {
      this.programs.push(t);
    },
    trackBuffer(t) {
      this.textures.length > 1e5
        ? console.error(
            "Memory Error: The application created more than 1000 ArrayBuffers.",
          )
        : this.buffers.push(t);
    },
    trackFrameBuffer(t) {
      this.textures.length > 1e5
        ? console.error(
            "Memory Error: The application created more than 1000 FrameBuffers.",
          )
        : this.frameBuffers.push(t);
    },
    trackTexture(t) {
      this.textures.length > 1e5
        ? console.error(
            "Memory Error: The application created more than 1000 Textures.",
          )
        : this.textures.push(t);
    },
    untrackProgram(t) {
      if (this.textures.length > 1e5)
        console.error(
          "Memory Error: The application created more than 1000 Programs.",
        );
      else
        for (let e = this.programs.length - 1; e >= 0; e--)
          if (this.programs === t) {
            this.programs.splice(e, 1);
            break;
          }
    },
    untrackBuffer(t) {
      for (let e = this.buffers.length - 1; e >= 0; e--)
        if (this.buffers === t) {
          this.buffers.splice(e, 1);
          break;
        }
    },
    untrackTexture(t) {
      for (let e = this.textures.length - 1; e >= 0; e--)
        if (this.textures === t) {
          this.textures.splice(e, 1);
          break;
        }
    },
    untrackFrameBuffer(t) {
      for (let e = this.frameBuffers.length - 1; e >= 0; e--)
        if (this.frameBuffers === t) {
          this.frameBuffers.splice(e, 1);
          break;
        }
    },
    destroy(t) {
      (this.textures.forEach((e) => {
        t.deleteTexture(e);
      }),
        this.buffers.forEach((e) => {
          t.deleteBuffer(e);
        }),
        this.frameBuffers.forEach((e) => {
          t.deleteFramebuffer(e);
        }),
        (this.textures = []),
        (this.buffers = []),
        (this.frameBuffers = []),
        (this.programs = []));
    },
  };
  let ft = null;
  class mt {
    constructor(t, e, i, s, r, n) {
      ((this.name = r),
        (this.gl = t),
        (this._buffer = this.gl.createBuffer()),
        pt.trackBuffer(this._buffer),
        (this.type = n || this.gl.FLOAT),
        (this._element = s ? "ELEMENT_ARRAY_BUFFER" : "ARRAY_BUFFER"),
        (this._target = this.gl[s ? "ELEMENT_ARRAY_BUFFER" : "ARRAY_BUFFER"]),
        this.update(e, i));
    }
    update(t, e) {
      ((this.data = t),
        (this.size = e),
        (this.length = this.data.length),
        this.gl.bindBuffer(this._target, this._buffer),
        /^instance/.test(this.name)
          ? this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.data)
          : this.gl.bufferData(this._target, this.data, this.gl.STATIC_DRAW),
        this.gl.bindBuffer(this._target, null));
    }
    subUpdate(t, e, i) {
      (ft != this &&
        ((ft = this), this.gl.bindBuffer(this._target, this._buffer)),
        this.gl.bindBuffer(this._target, this._buffer));
      let s = i * e * Float32Array.BYTES_PER_ELEMENT;
      this.gl.bufferSubData(this.gl.ARRAY_BUFFER, s, t, 0);
    }
    bind() {
      ft != this &&
        ((ft = this), this.gl.bindBuffer(this._target, this._buffer));
    }
  }
  let gt = null;
  class bt {
    constructor(t, e, i, s, r, n) {
      ((this.name = r),
        (this.gl = t),
        (this._buffer = this.gl.createBuffer()),
        pt.trackBuffer(this._buffer),
        (this.type = n || this.gl.FLOAT),
        (this._element = s ? "ELEMENT_ARRAY_BUFFER" : "ARRAY_BUFFER"),
        (this._target = this.gl[s ? "ELEMENT_ARRAY_BUFFER" : "ARRAY_BUFFER"]),
        this.update(e, i));
    }
    update(t, e) {
      ((this.data = t),
        (this.size = e),
        (this.length = this.data.length),
        this.gl.bindBuffer(this._target, this._buffer),
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.data),
        this.gl.bindBuffer(this._target, null));
    }
    subUpdate(t, e, i) {
      (gt != this &&
        ((gt = this), this.gl.bindBuffer(this._target, this._buffer)),
        this.gl.bindBuffer(this._target, this._buffer));
      let s = i * e * Float32Array.BYTES_PER_ELEMENT;
      this.gl.bufferSubData(this.gl.ARRAY_BUFFER, s, t, 0);
    }
    bind() {
      gt != this &&
        ((gt = this), this.gl.bindBuffer(this._target, this._buffer));
    }
  }
  const vt = 1e-6;
  let wt = "undefined" != typeof Float32Array ? Float32Array : Array;
  const yt = Math.random;
  function _t() {
    let t = new wt(16);
    return (
      (t[0] = 1),
      (t[1] = 0),
      (t[2] = 0),
      (t[3] = 0),
      (t[4] = 0),
      (t[5] = 1),
      (t[6] = 0),
      (t[7] = 0),
      (t[8] = 0),
      (t[9] = 0),
      (t[10] = 1),
      (t[11] = 0),
      (t[12] = 0),
      (t[13] = 0),
      (t[14] = 0),
      (t[15] = 1),
      t
    );
  }
  function Et(t, e) {
    return (
      (t[0] = e[0]),
      (t[1] = e[1]),
      (t[2] = e[2]),
      (t[3] = e[3]),
      (t[4] = e[4]),
      (t[5] = e[5]),
      (t[6] = e[6]),
      (t[7] = e[7]),
      (t[8] = e[8]),
      (t[9] = e[9]),
      (t[10] = e[10]),
      (t[11] = e[11]),
      (t[12] = e[12]),
      (t[13] = e[13]),
      (t[14] = e[14]),
      (t[15] = e[15]),
      t
    );
  }
  function xt(t) {
    return (
      (t[0] = 1),
      (t[1] = 0),
      (t[2] = 0),
      (t[3] = 0),
      (t[4] = 0),
      (t[5] = 1),
      (t[6] = 0),
      (t[7] = 0),
      (t[8] = 0),
      (t[9] = 0),
      (t[10] = 1),
      (t[11] = 0),
      (t[12] = 0),
      (t[13] = 0),
      (t[14] = 0),
      (t[15] = 1),
      t
    );
  }
  function Mt(t, e) {
    let i = e[0],
      s = e[1],
      r = e[2],
      n = e[3],
      o = e[4],
      a = e[5],
      h = e[6],
      l = e[7],
      d = e[8],
      c = e[9],
      u = e[10],
      p = e[11],
      f = e[12],
      m = e[13],
      g = e[14],
      b = e[15],
      v = i * a - s * o,
      w = i * h - r * o,
      y = i * l - n * o,
      _ = s * h - r * a,
      E = s * l - n * a,
      x = r * l - n * h,
      M = d * m - c * f,
      T = d * g - u * f,
      A = d * b - p * f,
      S = c * g - u * m,
      P = c * b - p * m,
      C = u * b - p * g,
      L = v * C - w * P + y * S + _ * A - E * T + x * M;
    return L
      ? ((L = 1 / L),
        (t[0] = (a * C - h * P + l * S) * L),
        (t[1] = (r * P - s * C - n * S) * L),
        (t[2] = (m * x - g * E + b * _) * L),
        (t[3] = (u * E - c * x - p * _) * L),
        (t[4] = (h * A - o * C - l * T) * L),
        (t[5] = (i * C - r * A + n * T) * L),
        (t[6] = (g * y - f * x - b * w) * L),
        (t[7] = (d * x - u * y + p * w) * L),
        (t[8] = (o * P - a * A + l * M) * L),
        (t[9] = (s * A - i * P - n * M) * L),
        (t[10] = (f * E - m * y + b * v) * L),
        (t[11] = (c * y - d * E - p * v) * L),
        (t[12] = (a * T - o * S - h * M) * L),
        (t[13] = (i * S - s * T + r * M) * L),
        (t[14] = (m * w - f * _ - g * v) * L),
        (t[15] = (d * _ - c * w + u * v) * L),
        t)
      : null;
  }
  function Tt(t, e, i) {
    let s = e[0],
      r = e[1],
      n = e[2],
      o = e[3],
      a = e[4],
      h = e[5],
      l = e[6],
      d = e[7],
      c = e[8],
      u = e[9],
      p = e[10],
      f = e[11],
      m = e[12],
      g = e[13],
      b = e[14],
      v = e[15],
      w = i[0],
      y = i[1],
      _ = i[2],
      E = i[3];
    return (
      (t[0] = w * s + y * a + _ * c + E * m),
      (t[1] = w * r + y * h + _ * u + E * g),
      (t[2] = w * n + y * l + _ * p + E * b),
      (t[3] = w * o + y * d + _ * f + E * v),
      (w = i[4]),
      (y = i[5]),
      (_ = i[6]),
      (E = i[7]),
      (t[4] = w * s + y * a + _ * c + E * m),
      (t[5] = w * r + y * h + _ * u + E * g),
      (t[6] = w * n + y * l + _ * p + E * b),
      (t[7] = w * o + y * d + _ * f + E * v),
      (w = i[8]),
      (y = i[9]),
      (_ = i[10]),
      (E = i[11]),
      (t[8] = w * s + y * a + _ * c + E * m),
      (t[9] = w * r + y * h + _ * u + E * g),
      (t[10] = w * n + y * l + _ * p + E * b),
      (t[11] = w * o + y * d + _ * f + E * v),
      (w = i[12]),
      (y = i[13]),
      (_ = i[14]),
      (E = i[15]),
      (t[12] = w * s + y * a + _ * c + E * m),
      (t[13] = w * r + y * h + _ * u + E * g),
      (t[14] = w * n + y * l + _ * p + E * b),
      (t[15] = w * o + y * d + _ * f + E * v),
      t
    );
  }
  function At(t, e, i) {
    let s = i[0],
      r = i[1],
      n = i[2];
    return (
      (t[0] = e[0] * s),
      (t[1] = e[1] * s),
      (t[2] = e[2] * s),
      (t[3] = e[3] * s),
      (t[4] = e[4] * r),
      (t[5] = e[5] * r),
      (t[6] = e[6] * r),
      (t[7] = e[7] * r),
      (t[8] = e[8] * n),
      (t[9] = e[9] * n),
      (t[10] = e[10] * n),
      (t[11] = e[11] * n),
      (t[12] = e[12]),
      (t[13] = e[13]),
      (t[14] = e[14]),
      (t[15] = e[15]),
      t
    );
  }
  function St(t, e) {
    let i = e[0] + e[5] + e[10],
      s = 0;
    return (
      i > 0
        ? ((s = 2 * Math.sqrt(i + 1)),
          (t[3] = 0.25 * s),
          (t[0] = (e[6] - e[9]) / s),
          (t[1] = (e[8] - e[2]) / s),
          (t[2] = (e[1] - e[4]) / s))
        : (e[0] > e[5]) & (e[0] > e[10])
          ? ((s = 2 * Math.sqrt(1 + e[0] - e[5] - e[10])),
            (t[3] = (e[6] - e[9]) / s),
            (t[0] = 0.25 * s),
            (t[1] = (e[1] + e[4]) / s),
            (t[2] = (e[8] + e[2]) / s))
          : e[5] > e[10]
            ? ((s = 2 * Math.sqrt(1 + e[5] - e[0] - e[10])),
              (t[3] = (e[8] - e[2]) / s),
              (t[0] = (e[1] + e[4]) / s),
              (t[1] = 0.25 * s),
              (t[2] = (e[6] + e[9]) / s))
            : ((s = 2 * Math.sqrt(1 + e[10] - e[0] - e[5])),
              (t[3] = (e[1] - e[4]) / s),
              (t[0] = (e[8] + e[2]) / s),
              (t[1] = (e[6] + e[9]) / s),
              (t[2] = 0.25 * s)),
      t
    );
  }
  function Pt(t, e, i, s) {
    let r,
      n,
      o,
      a,
      h,
      l,
      d,
      c,
      u,
      p,
      f = e[0],
      m = e[1],
      g = e[2],
      b = s[0],
      v = s[1],
      w = s[2],
      y = i[0],
      _ = i[1],
      E = i[2];
    return Math.abs(f - y) < vt && Math.abs(m - _) < vt && Math.abs(g - E) < vt
      ? xt(t)
      : ((d = f - y),
        (c = m - _),
        (u = g - E),
        (p = 1 / Math.sqrt(d * d + c * c + u * u)),
        (d *= p),
        (c *= p),
        (u *= p),
        (r = v * u - w * c),
        (n = w * d - b * u),
        (o = b * c - v * d),
        (p = Math.sqrt(r * r + n * n + o * o)),
        p
          ? ((p = 1 / p), (r *= p), (n *= p), (o *= p))
          : ((r = 0), (n = 0), (o = 0)),
        (a = c * o - u * n),
        (h = u * r - d * o),
        (l = d * n - c * r),
        (p = Math.sqrt(a * a + h * h + l * l)),
        p
          ? ((p = 1 / p), (a *= p), (h *= p), (l *= p))
          : ((a = 0), (h = 0), (l = 0)),
        (t[0] = r),
        (t[1] = a),
        (t[2] = d),
        (t[3] = 0),
        (t[4] = n),
        (t[5] = h),
        (t[6] = c),
        (t[7] = 0),
        (t[8] = o),
        (t[9] = l),
        (t[10] = u),
        (t[11] = 0),
        (t[12] = -(r * f + n * m + o * g)),
        (t[13] = -(a * f + h * m + l * g)),
        (t[14] = -(d * f + c * m + u * g)),
        (t[15] = 1),
        t);
  }
  function Ct() {
    let t = new wt(3);
    return ((t[0] = 0), (t[1] = 0), (t[2] = 0), t);
  }
  function Lt(t) {
    let e = t[0],
      i = t[1],
      s = t[2];
    return Math.sqrt(e * e + i * i + s * s);
  }
  function Rt(t, e, i) {
    let s = new wt(3);
    return ((s[0] = t), (s[1] = e), (s[2] = i), s);
  }
  function kt(t, e) {
    return ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), t);
  }
  function Dt(t, e, i, s) {
    return ((t[0] = e), (t[1] = i), (t[2] = s), t);
  }
  function Ft(t, e, i) {
    return (
      (t[0] = e[0] + i[0]),
      (t[1] = e[1] + i[1]),
      (t[2] = e[2] + i[2]),
      t
    );
  }
  function Ut(t, e, i) {
    return (
      (t[0] = e[0] - i[0]),
      (t[1] = e[1] - i[1]),
      (t[2] = e[2] - i[2]),
      t
    );
  }
  function Ot(t, e, i) {
    return ((t[0] = e[0] * i), (t[1] = e[1] * i), (t[2] = e[2] * i), t);
  }
  function $t(t, e) {
    let i = e[0],
      s = e[1],
      r = e[2],
      n = i * i + s * s + r * r;
    return (
      n > 0 &&
        ((n = 1 / Math.sqrt(n)),
        (t[0] = e[0] * n),
        (t[1] = e[1] * n),
        (t[2] = e[2] * n)),
      t
    );
  }
  function Nt(t, e) {
    return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
  }
  function Bt(t, e, i) {
    let s = e[0],
      r = e[1],
      n = e[2],
      o = i[0],
      a = i[1],
      h = i[2];
    return (
      (t[0] = r * h - n * a),
      (t[1] = n * o - s * h),
      (t[2] = s * a - r * o),
      t
    );
  }
  function It(t, e, i) {
    let s = e[0],
      r = e[1],
      n = e[2],
      o = i[3] * s + i[7] * r + i[11] * n + i[15];
    return (
      (o = o || 1),
      (t[0] = (i[0] * s + i[4] * r + i[8] * n + i[12]) / o),
      (t[1] = (i[1] * s + i[5] * r + i[9] * n + i[13]) / o),
      (t[2] = (i[2] * s + i[6] * r + i[10] * n + i[14]) / o),
      t
    );
  }
  function Ht(t, e, i) {
    let s = e[0],
      r = e[1],
      n = e[2],
      o = i[0],
      a = i[1],
      h = i[2],
      l = i[3],
      d = l * s + a * n - h * r,
      c = l * r + h * s - o * n,
      u = l * n + o * r - a * s,
      p = -o * s - a * r - h * n;
    return (
      (t[0] = d * l + p * -o + c * -h - u * -a),
      (t[1] = c * l + p * -a + u * -o - d * -h),
      (t[2] = u * l + p * -h + d * -a - c * -o),
      t
    );
  }
  function qt(t) {
    return `${Math.floor(1e4 * t[0]) / 1e4},${Math.floor(1e4 * t[1]) / 1e4},${Math.floor(1e4 * t[2]) / 1e4}`;
  }
  !(function () {
    let t = Ct();
  })();
  class Xt {
    constructor(t, e) {
      t &&
        ((this.gl = t),
        (this.attributes = {}),
        (this.length = e || 0),
        (this.groups = []));
    }
    addAttribute(t, e, i, s, r) {
      this.attributes[t] = new mt(this.gl, e, i, "index" === t, s, r);
    }
    addInstancedAttribute(t, e, i, s, r) {
      this.attributes[t] = new bt(this.gl, e, i, "index" === t, s, r);
    }
    getBoundingBox() {
      return (this.boudingBox || this.computeBoudingBox(), this.boudingBox);
    }
    computeBoudingBox(t) {
      return this.computeBoundingBox(t);
    }
    computeBoundingBox(t) {
      if (!this.attributes.position) return;
      let e = Rt(1 / 0, 1 / 0, 1 / 0),
        i = Rt(-1 / 0, -1 / 0, -1 / 0),
        s = this.attributes.position.data;
      for (let t = 0; t < s.length; t += 3)
        ((e[0] = Math.min(e[0], s[t + 0])),
          (e[1] = Math.min(e[1], s[t + 1])),
          (e[2] = Math.min(e[2], s[t + 2])),
          (i[0] = Math.max(i[0], s[t + 0])),
          (i[1] = Math.max(i[1], s[t + 1])),
          (i[2] = Math.max(i[2], s[t + 2])));
      let r = Ct();
      ((r[0] = e[0] + 0.5 * (i[0] + -1 * e[0])),
        (r[1] = e[1] + 0.5 * (i[1] + -1 * e[1])),
        (r[2] = e[2] + 0.5 * (i[2] + -1 * e[2])));
      let n = 2 * Math.abs(i[0] - r[0]),
        o = 2 * Math.abs(i[1] - r[1]),
        a = 2 * Math.abs(i[2] - r[2]);
      ((this.boundingBox = {
        center: r,
        width: n,
        height: o,
        depth: a,
        min: [e[0], e[1], e[2]],
        max: [i[0], i[1], i[2]],
        aabb: [e[0], e[1], e[2], i[0], i[1], i[2]],
      }),
        (this.boudingBox = this.boundingBox));
    }
    computeBoundingSphere() {
      if (!this.attributes.position) return;
      let t = 1e5,
        e = 1e5,
        i = 1e5,
        s = -1e5,
        r = -1e5,
        n = -1e5,
        o = this.attributes.position.data;
      for (let a = 0; a < o.length; a += 3)
        (o[a + 0] < t && (t = o[a + 0]),
          o[a + 0] > s && (s = o[a + 0]),
          o[a + 1] < e && (e = o[a + 1]),
          o[a + 1] > r && (r = o[a + 1]),
          o[a + 2] < i && (i = o[a + 2]),
          o[a + 2] > n && (n = o[a + 2]));
      let a = Ct();
      ((a[0] = t + 0.5 * (s + -1 * t)),
        (a[1] = e + 0.5 * (r + -1 * e)),
        (a[2] = i + 0.5 * (n + -1 * i)));
      let h = 0,
        l = Ct();
      for (let t = 0; t < o.length; t += 3)
        (Dt(l, o[t + 0], o[t + 1], o[t + 2]),
          Ut(l, l, a),
          (h = Math.max(h, Lt(l))));
      this.boundingSphere = { center: a, radius: h };
    }
    getBoundingSphere() {
      return (
        this.boundingSphere || this.computeBoundingSphere(),
        this.boundingSphere
      );
    }
    getAttribute(t) {
      return this.attributes[t];
    }
    computeVertexNormals() {
      if (!this.attributes.position) return;
      const t = this.attributes.position.data,
        e = new Map();
      let i = 0;
      for (let s = 0; s < t.length; s += 9) {
        const r = [t[s + 0], t[s + 1], t[s + 2]],
          n = [t[s + 3], t[s + 4], t[s + 5]],
          o = [t[s + 6], t[s + 7], t[s + 8]],
          a = qt(r),
          h = qt(n),
          l = qt(o);
        (e.has(a) || e.set(a, new Set()),
          e.has(h) || e.set(h, new Set()),
          e.has(l) || e.set(l, new Set()),
          e.get(a).add(i),
          e.get(h).add(i),
          e.get(l).add(i),
          i++);
      }
      const s = new Map();
      for (const [i, r] of e) {
        const e = Array.from(r),
          n = [];
        for (let i = 0; i < e.length; i++) {
          const s = e[i];
          let r = [t[9 * s + 0], t[9 * s + 1], t[9 * s + 2]],
            o = [t[9 * s + 3], t[9 * s + 4], t[9 * s + 5]],
            a = [t[9 * s + 6], t[9 * s + 7], t[9 * s + 8]],
            h = Ct(),
            l = Ct();
          (Ut(h, a, o), Ut(l, r, o), Bt(h, h, l), $t(h, h), n.push(h));
        }
        let o = [0, 0, 0];
        for (let t = 0; t < n.length; t++)
          ((o[0] += n[t][0]), (o[1] += n[t][1]), (o[2] += n[t][2]));
        n.length > 0 &&
          ((o[0] /= n.length), (o[1] /= n.length), (o[2] /= n.length));
        let a = Ct();
        (kt(a, o), $t(a, a), s.set(i, a));
      }
      const r = [];
      for (let e = 0; e < t.length; e += 3) {
        const i = qt([t[e + 0], t[e + 1], t[e + 2]]),
          n = s.get(i),
          o = Array.from(n);
        r.push(o[0], o[1], o[2]);
      }
      this.attributes.normal
        ? this.attributes.normal.update(
            new Float32Array(this.attributes.position.data.length),
            3,
          )
        : this.addAttribute(
            "normal",
            new Float32Array(this.attributes.position.data.length),
            3,
          );
    }
    computeVertexNormals2() {
      this.attributes.position &&
        (this.attributes.position.data,
        this.attributes.normal
          ? this.attributes.normal.update(
              new Float32Array(this.attributes.position.data.length),
              3,
            )
          : this.addAttribute(
              "normal",
              new Float32Array(this.attributes.position.data.length),
              3,
            ));
    }
    addGroup(t, e, i = 0) {
      this.groups.push({ start: t, count: e, materialIndex: i });
    }
  }
  const Wt = {
    5126: "1f",
    35664: "2f",
    35665: "3f",
    35666: "4f",
    35670: "1i",
    5124: "1i",
    35678: "1i",
    35679: "1i",
    35680: "1i",
    36289: "1i",
    35671: "2i",
    35667: "2i",
    35672: "3i",
    35668: "3i",
    35673: "4i",
    35669: "4i",
    35674: "Matrix2f",
    35675: "Matrix3f",
    35676: "Matrix4f",
  };
  var zt,
    Yt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
      "",
    ),
    Vt = new Array(36),
    Gt = 0;
  function jt() {
    for (var t = 0; t < 36; t++)
      8 === t || 13 === t || 18 === t || 23 === t
        ? (Vt[t] = "-")
        : 14 === t
          ? (Vt[t] = "4")
          : (Gt <= 2 && (Gt = (33554432 + 16777216 * Math.random()) | 0),
            (zt = 15 & Gt),
            (Gt >>= 4),
            (Vt[t] = Yt[19 === t ? (3 & zt) | 8 : zt]));
    return Vt.join("");
  }
  var Zt = {
    compile: function (t, e, i, s) {
      let r = i.trim(),
        n = "",
        o = r;
      r = r.replace(/\#version[^\n\r]+/, (t, e, i) => ((n = t), ""));
      var a = "";
      for (var h in s)
        null !== s[h] &&
          void 0 !== s[h] &&
          (a += "#define " + h + " " + s[h] + "\n");
      if (
        ((r = n + "\n" + a + "\n" + r),
        (r = (function (t) {
          let e = String(t);
          if (!/#pragma\s+unroll/.test(e)) return e;
          const i = {};
          e.replace(/#define\s+([_A-Za-z]\w*)\s+(\d+)/g, (t, e, s) => {
            i[e] = s;
          });
          const s =
            /#pragma\s+unroll\s+for\s*\(\s*int\s+([_A-Za-z]\w*)\s*=\s*(\d+)\s*;\s*[_A-Za-z]\w*\s*<\s*([_A-Za-z]\w*)\s*;\s*[_A-Za-z]\w*\+\+\s*\)\s*\{/g;
          let r;
          for (; null !== (r = s.exec(e)); ) {
            const [t, n, o, a] = r,
              h = r.index,
              l = h + t.length;
            let d = 1,
              c = l;
            for (; c < e.length && d > 0; ) {
              const t = e[c++];
              "{" === t ? d++ : "}" === t && d--;
            }
            if (0 !== d) break;
            const u = c - 1,
              p = e.slice(l, u),
              f = parseInt(i[o] ?? o, 10),
              m = parseInt(i[a] ?? a, 10);
            let g = "";
            for (let t = f; t < m; t++)
              g +=
                "{\n" +
                p
                  .replace(new RegExp(`\\[\\s*${n}\\s*\\]`, "g"), `[ ${t} ]`)
                  .replace(new RegExp(`\\b${n}\\b`, "g"), String(t)) +
                "\n}";
            ((e = e.slice(0, h) + g + e.slice(u + 1)),
              (s.lastIndex = h + g.length));
          }
          return e;
        })(r)),
        t.shaderSource(e, r),
        t.compileShader(e),
        !t.getShaderParameter(e, t.COMPILE_STATUS))
      ) {
        if (
          (console.error(
            "Shader cannot compile: \n" + (t.getShaderInfoLog(e) || ""),
          ),
          void 0,
          t.getShaderInfoLog(e))
        ) {
          let i = Number(
            t.getShaderInfoLog(e).match(/ERROR\:\s0\:([^:]+)\:/)[1],
          );
          console.warn(
            (function (t, e) {
              var i = t.split("\n");
              let s = [];
              for (var r = 0; r < i.length; r++)
                (e && (r < e - 20 || r > e + 20)) ||
                  ((i[r] = r + 1 + ": " + i[r]), s.push(i[r]));
              return s.join("\n");
            })(r, i),
          );
        } else void 0;
        return !1;
      }
      return !0;
    },
    settings: {},
  };
  const Kt =
    /Safari/g.test(navigator.userAgent) && !/Chrome/g.test(navigator.userAgent);
  let Qt = {
    attributes: [],
    uniforms: {},
    depthTest: null,
    blend: !1,
    program: null,
    geometry: null,
  };
  class Jt {
    constructor(t, e = {}) {
      (e.name && (this.name = e.name),
        e.id && (this.id = e.id),
        (this._uuid = jt()),
        (this.uuid = this._uuid),
        t &&
          ((e = Object.assign(
            {},
            {
              vertexShader:
                "precision highp float;\n\nattribute vec2 uv;\nattribute vec3 position;\n\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\n\nvarying vec2 vUv;\n\nvoid main(void) {\nvUv = uv;\ngl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);\n}",
              fragmentShader:
                "precision highp float;\n\nuniform float alpha;\nvarying vec2 vUv;\n\nvoid main(void) {\ngl_FragColor = vec4( vec3(1., 1., 1.), alpha);\n}",
              defines: {},
              extentions: {},
              type: t.TRIANGLES,
              uniforms: {},
              transformFeedbackVaryings: null,
            },
            e,
          )),
          (this.options = e),
          (this._vertexShaderSource = e.vertexShader),
          (this._fragmentShaderSource = e.fragmentShader),
          (this.name = e.name),
          (this.gl = t),
          (this._program = t.createProgram(this.name)),
          (this.vertexShader = t.createShader(t.VERTEX_SHADER)),
          (this.fragmentShader = t.createShader(t.FRAGMENT_SHADER)),
          t.attachShader(this._program, this.vertexShader),
          t.attachShader(this._program, this.fragmentShader),
          e.transformFeedbackVaryings &&
            ((this.transformFeedback = t.createTransformFeedback()),
            t.bindTransformFeedback(
              t.TRANSFORM_FEEDBACK,
              this.transformFeedback,
            ),
            t.transformFeedbackVaryings(
              this._program,
              e.transformFeedbackVaryings,
              t.SEPARATE_ATTRIBS,
            )),
          (this.type = e.type),
          (this.attributes = {}),
          (this.defines = e.defines),
          (this._lastDefines = {}),
          (this.extentions = e.extentions),
          (this._textureUnit = 0),
          (this.depthTest = void 0 === e.depthTest || e.depthTest),
          (this.blend = void 0 !== e.blend && e.blend),
          (this.blendEquation =
            void 0 !== e.blendEquation ? e.blendEquation : this.gl.FUNC_ADD),
          (this.blendEquationSeparate =
            void 0 !== e.blendEquationSeparate
              ? e.blendEquationSeparate
              : null),
          (this.blendSrc =
            void 0 !== e.blendSrc ? e.blendSrc : this.gl.SRC_ALPHA),
          (this.blendDst =
            void 0 !== e.blendDst ? e.blendDst : this.gl.ONE_MINUS_SRC_ALPHA),
          (this.blendSrcRGB =
            void 0 !== e.blendSrcRGB ? e.blendSrcRGB : this.gl.SRC_ALPHA),
          (this.blendDstRGB =
            void 0 !== e.blendDstRGB
              ? e.blendDstRGB
              : this.gl.ONE_MINUS_SRC_ALPHA),
          (this.blendSrcAlpha =
            void 0 !== e.blendSrcAlpha ? e.blendSrcAlpha : this.gl.ONE),
          (this.blendDstAlpha =
            void 0 !== e.blendDstAlpha
              ? e.blendDstAlpha
              : this.gl.ONE_MINUS_SRC_ALPHA),
          (this.wireframe = void 0 !== e.wireframe && e.wireframe),
          (this.lines = void 0 !== e.lines && e.lines),
          (this.uniforms = {}),
          (this.defaultUniforms = e.uniforms),
          this.compile()));
    }
    compile(t) {
      if (this.gl && !this.isCompiling) {
        if (
          ((this.isCompiling = !0),
          (Kt || t) &&
            (this.gl.detachShader(this._program, this.vertexShader),
            this.gl.detachShader(this._program, this.fragmentShader),
            (this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)),
            (this.fragmentShader = this.gl.createShader(
              this.gl.FRAGMENT_SHADER,
            )),
            this.gl.attachShader(this._program, this.vertexShader),
            this.gl.attachShader(this._program, this.fragmentShader)),
          !Zt.compile(
            this.gl,
            this.vertexShader,
            this._vertexShaderSource,
            this.defines,
          ) ||
            !Zt.compile(
              this.gl,
              this.fragmentShader,
              this._fragmentShaderSource,
              this.defines,
            ))
        )
          return (console.warn("compile error"), !1);
        (this.gl.linkProgram(this._program),
          this.gl.getProgramParameter(this._program, this.gl.LINK_STATUS) ||
            console.error(
              "Cannot link program: \n" +
                this.gl.getProgramInfoLog(this._program) || "",
            ),
          this.gl.useProgram(this._program),
          this._retrieveUniformsFromShader());
      }
    }
    _retrieveUniformsFromShader() {
      this._savedUniforms = {};
      for (let t in this.uniforms)
        this._savedUniforms[t] = { value: this.uniforms[t].value };
      ((this.uniforms = {}), (this._textureUnit = 0));
      var t = this.gl.getProgramParameter(
        this._program,
        this.gl.ACTIVE_UNIFORMS,
      );
      for (let i = 0; i < t; ++i) {
        var e = this.gl.getActiveUniform(this._program, i);
        if (null === e) {
          this.gl.getError();
          continue;
        }
        let t = e.name,
          s = !1;
        (/\[.*\]/.test(t) && ((s = !0), (t = t.replace(/\[.*\]/, ""))),
          void 0 !== this.uniforms[t]
            ? ((this.uniforms[t].location = this.gl.getUniformLocation(
                this._program,
                t,
              )),
              (this.uniforms[t].type = e.type))
            : ((this.uniforms[t] = {
                isArray: s,
                location: this.gl.getUniformLocation(this._program, t),
                type: e.type,
                value: null,
                oldValue: null,
                size: e.size,
              }),
              (35678 !== e.type &&
                35680 !== e.type &&
                35679 != e.type &&
                36289 != e.type) ||
                ((this.uniforms[t].unit = this._textureUnit),
                this._textureUnit++)));
      }
      for (let t in this._savedUniforms)
        void 0 !== this.uniforms[t] &&
          void 0 !== this._savedUniforms[t].value &&
          null !== this._savedUniforms[t].value &&
          (this.uniforms[t].value = this._savedUniforms[t].value);
      for (let t in this.defaultUniforms)
        void 0 !== this.uniforms[t] &&
          void 0 !== this.defaultUniforms[t] &&
          null !== this.defaultUniforms[t] &&
          (this.uniforms[t].value = this.defaultUniforms[t]);
      var i = this.gl.getProgramParameter(
        this._program,
        this.gl.ACTIVE_ATTRIBUTES,
      );
      for (let t = 0; t < i; ++t) {
        var s = this.gl.getActiveAttrib(this._program, t);
        null !== s
          ? (this.attributes[s.name] = {
              location: this.gl.getAttribLocation(this._program, s.name),
              type: s.type,
            })
          : this.gl.getError();
      }
      this.isCompiling = !1;
    }
    dispose() {}
    use() {
      this.gl && this.gl.useProgram(this._program);
    }
    attribPointer(t) {
      if (this.gl) {
        for (var e in this.attributes)
          if (void 0 !== t.attributes[e])
            if ("instanceMatrix" == e)
              for (let i = 0; i < 4; ++i) {
                const s = this.attributes[e].location + i;
                (this.gl.enableVertexAttribArray(s),
                  this.gl.vertexAttribDivisor(s, 1),
                  t.attributes[e].bind(),
                  this.gl.vertexAttribPointer(
                    s,
                    4,
                    this.gl.FLOAT,
                    !1,
                    64,
                    4 * i * 4,
                  ));
              }
            else if (
              "instanceColor" == e ||
              "instancePosition" == e ||
              "instanceRotation" == e ||
              "instanceScale" == e ||
              "instanceTilePosition" == e ||
              "instanceTileScale" == e
            ) {
              const i = this.attributes[e].location;
              (this.gl.enableVertexAttribArray(i),
                this.gl.vertexAttribDivisor(i, 1),
                t.attributes[e].bind(),
                this.gl.vertexAttribPointer(i, 3, this.gl.FLOAT, !1, 12, 0));
            } else if ("instanceUv" == e || "instanceLightmapTileOffset" == e) {
              const i = this.attributes[e].location;
              (this.gl.enableVertexAttribArray(i),
                this.gl.vertexAttribDivisor(i, 1),
                t.attributes[e].bind(),
                this.gl.vertexAttribPointer(i, 2, this.gl.FLOAT, !1, 8, 0));
            } else if (
              "instanceShadowVisibility" == e ||
              "instanceCardAtlasInfos" == e ||
              "probeIndex" == e ||
              "instanceClusterIndex" == e ||
              "instanceFaceAtlasStartIndex" == e ||
              "instanceTileLevel" == e ||
              "instanceTileIndex" == e ||
              "instanceIndex2" == e ||
              "instanceLightmapTileSize" == e ||
              "instanceFoliageTileIndex" == e ||
              "instanceFoliageIndex" == e ||
              "instanceMatrixIndex" == e
            ) {
              const i = this.attributes[e].location;
              (t.attributes[e].bind(),
                this.gl.enableVertexAttribArray(i),
                this.gl?.vertexAttribDivisor(i, 1));
              const s = 0;
              this.gl.vertexAttribPointer(i, 1, t.attributes[e].type, !1, 4, s);
            } else {
              const { location: i, stride: s, offset: r } = this.attributes[e],
                { size: n, type: o } = t.attributes[e];
              (this.gl?.vertexAttribDivisor(i, 0),
                this.gl.enableVertexAttribArray(i),
                t.attributes[e].bind(),
                r && s
                  ? this.gl.vertexAttribPointer(i, n, o, !1, s, r)
                  : this.gl.vertexAttribPointer(i, n, o, !1, 0, 0));
            }
      } else console.warn("Program.attribPointer error: missing gl");
    }
    clone() {}
    draw(t, e) {
      const i = e?.usetransformFeedback,
        s = e?.overrides;
      if (!this.gl) return;
      let r = Object.keys(this.defines),
        n = Object.keys(this._lastDefines),
        o = r.length != n.length;
      for (var a in this.defines)
        this.defines[a] !== this._lastDefines[a] && (o = !0);
      if (o) {
        for (var a in ((this._lastDefines = {}), this.defines))
          this._lastDefines[a] = this.defines[a];
        this.compile();
      }
      ((o || this._program !== Qt.program) &&
        (this.gl.useProgram(this._program), (Qt.program = this._program)),
        //!!! WARNING  THIS OPTIM BREAKS SKY ADN OTHER THINGS ON WINDOWS !!!
        this.attribPointer(t));
      let h = null != s?.depthTest ? s.depthTest : this.depthTest;
      if (
        (h !== Qt.depthTest &&
          (this.gl[h ? "enable" : "disable"](this.gl.DEPTH_TEST),
          (Qt.depthTest = h)),
        s?.blend || this.blend)
      ) {
        (h &&
          (s?.depthFunc
            ? this.gl.depthFunc(s.depthFunc)
            : this.gl.depthFunc(this.gl.LESS)),
          s?.blendEquation
            ? (this.gl.blendEquationSeparate(
                this.blendEquation,
                s?.blendEquation,
              ),
              (Qt.blendEquation = null))
            : s?.blendEquationRGB
              ? (this.gl.blendEquationSeparate(
                  s?.blendEquationRGB,
                  this.blendEquation,
                ),
                (Qt.blendEquation = null))
              : s?.blendEquationSeparate
                ? (this.gl.blendEquationSeparate(
                    s.blendEquationSeparate.rgb,
                    s.blendEquationSeparate.alpha,
                  ),
                  (Qt.blendEquation = null))
                : this.blendEquationSeparate
                  ? this.gl.blendEquationSeparate(
                      this.blendEquationSeparate.rgb,
                      this.blendEquationSeparate.alpha,
                    )
                  : Qt.blendEquation !==
                      (s?.blendEquation ||
                        s?.blendEquationRGB ||
                        this.blendEquation) &&
                    (this.gl.blendEquation(
                      s?.blendEquation ||
                        s?.blendEquationRGB ||
                        this.blendEquation,
                    ),
                    (Qt.blendEquation =
                      s?.blendEquation ||
                      s?.blendEquationRGB ||
                      this.blendEquation)));
        const t = void 0 !== s?.blendSrcRGB ? s?.blendSrcRGB : this.blendSrcRGB,
          e = void 0 !== s?.blendDstRGB ? s?.blendDstRGB : this.blendDstRGB,
          i =
            void 0 !== s?.blendSrcAlpha ? s?.blendSrcAlpha : this.blendSrcAlpha,
          r =
            void 0 !== s?.blendDstAlpha ? s?.blendDstAlpha : this.blendDstAlpha;
        ((Qt.blendSrcRGB === t &&
          Qt.blendDstRGB === e &&
          Qt.blendSrcAlpha === i &&
          Qt.blendDstAlpha === r) ||
          ((Qt.blendSrcRGB = t),
          (Qt.blendDstRGB = e),
          (Qt.blendSrcAlpha = i),
          (Qt.blendDstAlpha = r),
          this.gl.blendFuncSeparate(t, e, i, r)),
          Qt.blend || (this.gl.enable(this.gl.BLEND), (Qt.blend = !0)));
      } else
        (Qt.blend && (this.gl.disable(this.gl.BLEND), (Qt.blend = !1)),
          s?.depthFunc
            ? this.gl.depthFunc(s.depthFunc)
            : this.gl.depthFunc(this.gl.LESS));
      for (
        var l = Object.keys(this.uniforms), d = 0, c = l.length;
        d < c;
        d++
      ) {
        let t = l[d];
        if (
          null !== this.uniforms[t].value &&
          void 0 !== this.uniforms[t].value
        )
          switch (this.uniforms[t].type) {
            case this.gl.FLOAT_MAT2:
            case this.gl.FLOAT_MAT3:
            case this.gl.FLOAT_MAT4:
              this.uniforms[t].value &&
                this.uniforms[t].value.length > 0 &&
                (this.gl["uniform" + Wt[this.uniforms[t].type] + "v"](
                  this.uniforms[t].location,
                  !1,
                  this.uniforms[t].value,
                ),
                (this.uniforms[t].oldValue = this.uniforms[t].value),
                (Qt.uniforms[t] = this.uniforms[t].value));
              break;
            default:
              if (
                35678 === this.uniforms[t].type ||
                35680 === this.uniforms[t].type ||
                35679 === this.uniforms[t].type ||
                36289 === this.uniforms[t].type
              )
                (this.uniforms[t].value.bind(this.uniforms[t].unit),
                  this.gl["uniform" + Wt[this.uniforms[t].type]](
                    this.uniforms[t].location,
                    this.uniforms[t].unit,
                  ));
              else {
                let e = Wt[this.uniforms[l[d]].type];
                this.uniforms[t].isArray && (e += "v");
                {
                  let i = this.uniforms[t].value;
                  switch (e) {
                    case "2f":
                      this.gl["uniform" + e](
                        this.uniforms[t].location,
                        i[0],
                        i[1],
                      );
                      break;
                    case "3f":
                      this.gl["uniform" + e](
                        this.uniforms[t].location,
                        i[0],
                        i[1],
                        i[2],
                      );
                      break;
                    case "4f":
                      this.gl["uniform" + e](
                        this.uniforms[t].location,
                        i[0],
                        i[1],
                        i[2],
                        i[3],
                      );
                      break;
                    default:
                      this.gl["uniform" + e](this.uniforms[t].location, i);
                  }
                }
              }
          }
      }
      let u = null != s?.type ? s.type : this.type,
        p = !1,
        f = 1;
      for (let e in t.attributes)
        /^instance/.test(e) &&
          "instanceIndex" !== e &&
          ((p = !0),
          (f = Math.max(1, t.attributes[e].length / t.attributes[e].size)),
          t.attributes[e]);
      if (t.indirectBuffer && t.drawCommands) {
        this.multiDrawExtention ||
          ((this.multiDrawExtention = this.gl.getExtension("WEBGL_multi_draw")),
          this.multiDrawExtention ||
            console.error("WEBGL_multi_draw extension not available!"));
        const e = t.drawCommands.length / 5,
          i = new Int32Array(e),
          s = new Int32Array(e),
          r = new Int32Array(e),
          n = new Int32Array(e);
        for (let o = 0, a = 0; o < e; o++, a += 5)
          ((s[o] = t.drawCommands[a]),
            (r[o] = t.drawCommands[a + 1]),
            (i[o] = t.drawCommands[a + 2]),
            (n[o] = t.drawCommands[a + 4]));
        this.multiDrawExtention.multiDrawArraysInstancedWEBGL(
          this.gl.TRIANGLES,
          i,
          0,
          s,
          0,
          r,
          0,
          e,
        );
      } else if (i)
        (this.gl.enable(this.gl.RASTERIZER_DISCARD),
          this.gl.bindTransformFeedback(
            this.gl.TRANSFORM_FEEDBACK,
            this.transformFeedback,
          ),
          this.gl.bindBufferBase(
            this.gl.TRANSFORM_FEEDBACK_BUFFER,
            0,
            s.transformFeedBackBuffer,
          ),
          this.gl.beginTransformFeedback(this.gl.POINTS),
          this.gl.drawArrays(this.gl.POINTS, 0, t.length),
          this.gl.endTransformFeedback(),
          this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, 0, null),
          this.gl.disable(this.gl.RASTERIZER_DISCARD));
      else if (p) {
        let e = t.attributes.index;
        if (e) {
          let t = this.gl.UNSIGNED_SHORT;
          (e.data instanceof Uint32Array && (t = this.gl.UNSIGNED_INT),
            e.bind(),
            this.gl.drawElementsInstanced(
              this.lines
                ? this.gl.LINES
                : this.wireframe
                  ? this.gl.LINE_STRIP
                  : u,
              e.length,
              t,
              0,
              f,
            ));
        } else
          this.gl.drawArraysInstanced(
            this.lines
              ? this.gl.LINES
              : this.wireframe
                ? this.gl.LINE_STRIP
                : u,
            0,
            t.length,
            f,
          );
      } else {
        let e = t.attributes.index;
        if (u !== this.gl.POINTS && e) {
          let t = this.gl.UNSIGNED_SHORT;
          (e.data instanceof Uint32Array && (t = this.gl.UNSIGNED_INT),
            e.bind(),
            this.gl.drawElements(
              this.lines
                ? this.gl.LINES
                : this.wireframe
                  ? this.gl.LINE_STRIP
                  : u,
              e.length,
              t,
              0,
            ));
        } else
          this.gl.drawArrays(
            this.lines
              ? this.gl.LINES
              : this.wireframe
                ? this.gl.LINE_STRIP
                : u,
            0,
            t.length,
          );
      }
    }
    setUniform(t, e) {
      this.uniforms[t] && (this.uniforms[t].value = e);
    }
    setDefine(t, e) {
      null == e ? delete this.defines[t] : (this.defines[t] = e);
    }
  }
  function te(t, e, i) {
    return 9728 | +t | (+e << 8) | (+(e && i) << 1);
  }
  function ee(t) {
    return !(t & (t - 1));
  }
  class ie {
    constructor(t, e) {
      t &&
        ((this.options = Object.assign(
          {},
          {
            format: t.RGBA,
            type: t.UNSIGNED_BYTE,
            width: 1,
            height: 1,
            linear: !0,
            mipmap: !1,
            miplinear: !1,
            wrapS: t.CLAMP_TO_EDGE,
            wrapT: t.CLAMP_TO_EDGE,
            anisotropy: 0,
            flipY: !0,
            dataFlipY: !1,
            repeat: [1, 1],
            data: null,
            isHeightmap: !1,
            target: t.TEXTURE_2D,
          },
          e,
        )),
        (this._uid = jt()),
        (this.uuid = this._uid),
        (this.gl = t),
        (this.width = this.options.width),
        (this.height = this.options.height),
        (this.format = this.options.format),
        (this.type = this.options.type),
        (this.flipY = this.options.flipY),
        (this._data = this.options.data),
        (this.repeat = this.options.repeat),
        (this._anisotropy = this.options.anisotropy),
        (this.target = this.options.target),
        this.type == t.FLOAT &&
          (t.getExtension("EXT_color_buffer_float"),
          t.getExtension("OES_texture_float_linear")),
        "HALF_FLOAT" == this.type &&
          (t.getExtension("EXT_color_buffer_float"),
          t.getExtension("OES_texture_half_float_linear")),
        (this._texture = this.gl.createTexture()),
        pt.trackTexture(this._texture),
        t.bindTexture(this.target, this._texture),
        this.type == this.gl.FLOAT &&
          this._data &&
          (this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.dataFlipY),
          this.gl.texImage2D(
            this.target,
            0,
            this.gl.RGBA32F,
            this.width,
            this.height,
            0,
            this.gl.RGBA,
            this.gl.FLOAT,
            this._data,
          )),
        (this.wrapS = this.options.wrapS),
        (this.wrapT = this.options.wrapT),
        this.gl.bindTexture(this.target, this._texture),
        this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS),
        this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT),
        this.setFilter(
          this.options.linear,
          this.options.mipmap,
          this.options.mipmapLinear,
        ),
        t.bindTexture(this.target, null),
        Object.defineProperty(this, "anisotropy", {
          set: (t) => {
            ((this._anisotropy = t), this.updateAnisotropyFilter());
          },
          get: () => this._anisotropy,
        }));
    }
    updateAnisotropyFilter() {
      let t = this.gl;
      if (t && 0 != this._anisotropy) {
        var e =
          t.getExtension("EXT_texture_filter_anisotropic") ||
          t.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
          t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        if (e && this._anisotropy > 0) {
          t.bindTexture(this.target, this._texture);
          var i = t.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
          t.texParameterf(
            this.target,
            e.TEXTURE_MAX_ANISOTROPY_EXT,
            Math.min(this._anisotropy, i),
          );
        }
        void 0;
      }
    }
    bindData(t, e, i) {
      (e && (this.width = e),
        i && (this.height = i),
        (this._data = t),
        this.type == this.gl.FLOAT &&
          this._data &&
          (this.gl.bindTexture(this.target, this._texture),
          this.gl.texImage2D(
            this.target,
            0,
            this.gl.RGBA32F,
            this.width,
            this.height,
            0,
            this.gl.RGBA,
            this.gl.FLOAT,
            this._data,
          ),
          this.gl.bindTexture(this.target, null)));
    }
    bindImage(t) {
      if (this.gl) {
        ((this.img = t),
          (this.image = t),
          (this.width = t.width),
          (this.height = t.height));
        var e = ee(t.width) && ee(t.height);
        (this.gl.bindTexture(this.target, this._texture),
          this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY),
          this.options.type == this.gl.FLOAT
            ? this.gl.texImage2D(
                this.target,
                0,
                this.gl.RGBA32F,
                this.gl.RGBA,
                this.options.type,
                t,
              )
            : this.gl.texImage2D(
                this.target,
                0,
                this.gl.RGBA,
                this.gl.RGBA,
                this.options.type,
                t,
              ),
          e
            ? (this.setFilter(
                this.options.linear,
                this.options.mipmap,
                this.options.mipmapLinear,
              ),
              this.gl.generateMipmap(this.target))
            : (this.setFilter(this.options.linear, !1, !1),
              (this.wrapS = this.gl.CLAMP_TO_EDGE),
              (this.wrapT = this.gl.CLAMP_TO_EDGE)),
          this.gl.bindTexture(this.target, null));
      }
    }
    bind(t) {
      this.gl &&
        (void 0 !== t && this.gl.activeTexture(this.gl.TEXTURE0 + (0 | t)),
        this.gl.bindTexture(this.target, this._texture));
    }
    delete() {
      (this.gl &&
        (this.gl.deleteTexture(this._texture),
        pt.untrackTexture(this._texture)),
        (this._texture = null),
        (this.gl = null));
    }
    setFilter(t, e, i) {
      if (this.gl) {
        var s = this.gl,
          r = te(!!t, !!e, !!i);
        (s.bindTexture(this.target, this._texture),
          s.texParameteri(this.target, s.TEXTURE_MAG_FILTER, te(!!t, !1, !1)),
          s.texParameteri(this.target, s.TEXTURE_MIN_FILTER, r));
      }
    }
    loadFromUrl(t, e = {}) {
      if (e.useImageBitmap)
        (async () => {
          try {
            const i = await fetch(t);
            if (!i.ok) throw new Error(`Failed to fetch: ${t}`);
            const s = await i.blob(),
              r = await createImageBitmap(s, {
                premultiplyAlpha: "default",
                colorSpaceConversion: "default",
              });
            ((this.isImageBitmap = !0),
              this.bindImage(r),
              (this.loaded = !0),
              (this.error = !1),
              e.onLoaded && e.onLoaded(t));
          } catch (i) {
            ((this.loaded = !1),
              (this.error = !0),
              e.onError && e.onError(i),
              console.warn(`this.fromUrl(${t}) failed`, i));
          }
        })();
      else {
        var i = new Image();
        ((i.crossOrigin = ""),
          (i.onload = () => {
            ((i.onload = null),
              (i.onerror = null),
              (this.loaded = !0),
              (this.error = !1),
              this.bindImage(i),
              e && e.onLoaded && e.onLoaded(t));
          }),
          (i.onerror = () => {
            ((i.onload = null),
              (i.onerror = null),
              (this.loaded = !1),
              (this.error = !0),
              e && e.onError && e.onError(t),
              console.warn("Invalid url provided to Texture.fromUrl() : " + t));
          }),
          (i.src = t));
      }
    }
  }
  function se() {
    let t = new wt(4);
    return ((t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 1), t);
  }
  ((ie.fromUrl = function (t, e, i = {}) {
    const s = new ie(t, i);
    return ((s.loaded = !1), s.loadFromUrl(e, i), s);
  }),
    (ie.fromImage = function (t, e, i) {
      if (e.width && e.height) {
        var s = new ie(t, i);
        return (s.bindImage(e), (s.loaded = !0), (s.error = !1), s);
      }
      console.warn(
        "Cannot create texture with provided image\n Please make sure the image is loaded before calling Texture.fromImage() or use Texture.fromUrl() instead",
        e,
      );
    }),
    (function () {
      let t = (function () {
        let t = new wt(4);
        return ((t[0] = 0), (t[1] = 0), (t[2] = 0), (t[3] = 0), t);
      })();
    })());
  function re(t, e) {
    return new Proxy(t, { set: (t, i, s) => ((t[i] = s), e(), !0) });
  }
  (!(function () {
    let t = Ct(),
      e = Rt(1, 0, 0),
      i = Rt(0, 1, 0);
  })(),
    (function () {
      let t = se(),
        e = se();
    })(),
    (function () {
      let t = (function () {
        let t = new wt(9);
        return (
          (t[0] = 1),
          (t[1] = 0),
          (t[2] = 0),
          (t[3] = 0),
          (t[4] = 1),
          (t[5] = 0),
          (t[6] = 0),
          (t[7] = 0),
          (t[8] = 1),
          t
        );
      })();
    })());
  class ne {
    get position() {
      return this._position;
    }
    set position(t) {
      ((this._position = re(t, () => (this.needsUpdate = !0))),
        (this.needsUpdate = !0));
    }
    get rotation() {
      return this._rotation;
    }
    set rotation(t) {
      ((this._rotation = re(t, () => (this.needsUpdate = !0))),
        (this.needsUpdate = !0));
    }
    get scale() {
      return this._scale;
    }
    set scale(t) {
      ((this._scale = re(t, () => (this.needsUpdate = !0))),
        (this.needsUpdate = !0));
    }
    get lookAt() {
      return this._lookAt;
    }
    set lookAt(t) {
      ((this._lookAt = t ? re(t, () => (this.needsUpdate = !0)) : t),
        (this.needsUpdate = !0));
    }
    get up() {
      return this._up;
    }
    set up(t) {
      ((this._up = re(t, () => (this.needsUpdate = !0))),
        (this.needsUpdate = !0));
    }
    get quaternion() {
      return this._quaternion;
    }
    set quaternion(t) {
      ((this._quaternion = t ? re(t, () => (this.needsUpdate = !0)) : t),
        (this.needsUpdate = !0));
    }
    constructor() {
      ((this.uuid = jt()),
        (this._position = re(Rt(0, 0, 0), () => (this.needsUpdate = !0))),
        (this._rotation = re(Rt(0, 0, 0), () => (this.needsUpdate = !0))),
        (this._scale = re(Rt(1, 1, 1), () => (this.needsUpdate = !0))),
        (this._up = re(Rt(0, 1, 0), () => (this.needsUpdate = !0))),
        (this._lookAt = null),
        (this._quaternion = null),
        (this._normalMatrix = _t()),
        (this.lastPosition = Ct()),
        (this.lastRotation = Ct()),
        (this.lastScale = Ct()),
        (this.lastLookAt = Ct()),
        (this.matrix = _t()),
        (this.worldMatrix = _t()),
        (this.inverseWorldMatrix = _t()),
        (this._invLookatMat4 = _t()),
        (this._rotationMat4 = _t()),
        (this._lookAtMat4 = _t()),
        (this._lastUpdate = Date.now()),
        (this.needsUpdate = !0));
    }
    render(t) {
      (t || this.needsUpdate) &&
        (this.updateMatrix(),
        this.updateWorldMatrix(),
        (this.needsUpdate = !1));
    }
    updateMatrix() {
      (xt(this.matrix),
        xt(this._invLookatMat4),
        xt(this._rotationMat4),
        xt(this._lookAtMat4),
        this.quaternion
          ? (function (t, e, i) {
              let s = e[0],
                r = e[1],
                n = e[2],
                o = e[3],
                a = s + s,
                h = r + r,
                l = n + n,
                d = s * a,
                c = s * h,
                u = s * l,
                p = r * h,
                f = r * l,
                m = n * l,
                g = o * a,
                b = o * h,
                v = o * l;
              ((t[0] = 1 - (p + m)),
                (t[1] = c + v),
                (t[2] = u - b),
                (t[3] = 0),
                (t[4] = c - v),
                (t[5] = 1 - (d + m)),
                (t[6] = f + g),
                (t[7] = 0),
                (t[8] = u + b),
                (t[9] = f - g),
                (t[10] = 1 - (d + p)),
                (t[11] = 0),
                (t[12] = i[0]),
                (t[13] = i[1]),
                (t[14] = i[2]),
                (t[15] = 1));
            })(this.matrix, this.quaternion, this._position)
          : ((function (t, e, i) {
              let s,
                r,
                n,
                o,
                a,
                h,
                l,
                d,
                c,
                u,
                p,
                f,
                m = i[0],
                g = i[1],
                b = i[2];
              e === t
                ? ((t[12] = e[0] * m + e[4] * g + e[8] * b + e[12]),
                  (t[13] = e[1] * m + e[5] * g + e[9] * b + e[13]),
                  (t[14] = e[2] * m + e[6] * g + e[10] * b + e[14]),
                  (t[15] = e[3] * m + e[7] * g + e[11] * b + e[15]))
                : ((s = e[0]),
                  (r = e[1]),
                  (n = e[2]),
                  (o = e[3]),
                  (a = e[4]),
                  (h = e[5]),
                  (l = e[6]),
                  (d = e[7]),
                  (c = e[8]),
                  (u = e[9]),
                  (p = e[10]),
                  (f = e[11]),
                  (t[0] = s),
                  (t[1] = r),
                  (t[2] = n),
                  (t[3] = o),
                  (t[4] = a),
                  (t[5] = h),
                  (t[6] = l),
                  (t[7] = d),
                  (t[8] = c),
                  (t[9] = u),
                  (t[10] = p),
                  (t[11] = f),
                  (t[12] = s * m + a * g + c * b + e[12]),
                  (t[13] = r * m + h * g + u * b + e[13]),
                  (t[14] = n * m + l * g + p * b + e[14]),
                  (t[15] = o * m + d * g + f * b + e[15]));
            })(this.matrix, this.matrix, this._position),
            (function (t, e, i) {
              let s = Math.sin(i),
                r = Math.cos(i),
                n = e[4],
                o = e[5],
                a = e[6],
                h = e[7],
                l = e[8],
                d = e[9],
                c = e[10],
                u = e[11];
              (e !== t &&
                ((t[0] = e[0]),
                (t[1] = e[1]),
                (t[2] = e[2]),
                (t[3] = e[3]),
                (t[12] = e[12]),
                (t[13] = e[13]),
                (t[14] = e[14]),
                (t[15] = e[15])),
                (t[4] = n * r + l * s),
                (t[5] = o * r + d * s),
                (t[6] = a * r + c * s),
                (t[7] = h * r + u * s),
                (t[8] = l * r - n * s),
                (t[9] = d * r - o * s),
                (t[10] = c * r - a * s),
                (t[11] = u * r - h * s));
            })(this._rotationMat4, this._rotationMat4, this._rotation[0]),
            (function (t, e, i) {
              let s = Math.sin(i),
                r = Math.cos(i),
                n = e[0],
                o = e[1],
                a = e[2],
                h = e[3],
                l = e[8],
                d = e[9],
                c = e[10],
                u = e[11];
              (e !== t &&
                ((t[4] = e[4]),
                (t[5] = e[5]),
                (t[6] = e[6]),
                (t[7] = e[7]),
                (t[12] = e[12]),
                (t[13] = e[13]),
                (t[14] = e[14]),
                (t[15] = e[15])),
                (t[0] = n * r - l * s),
                (t[1] = o * r - d * s),
                (t[2] = a * r - c * s),
                (t[3] = h * r - u * s),
                (t[8] = n * s + l * r),
                (t[9] = o * s + d * r),
                (t[10] = a * s + c * r),
                (t[11] = h * s + u * r));
            })(this._rotationMat4, this._rotationMat4, this._rotation[1]),
            (function (t, e, i) {
              let s = Math.sin(i),
                r = Math.cos(i),
                n = e[0],
                o = e[1],
                a = e[2],
                h = e[3],
                l = e[4],
                d = e[5],
                c = e[6],
                u = e[7];
              (e !== t &&
                ((t[8] = e[8]),
                (t[9] = e[9]),
                (t[10] = e[10]),
                (t[11] = e[11]),
                (t[12] = e[12]),
                (t[13] = e[13]),
                (t[14] = e[14]),
                (t[15] = e[15])),
                (t[0] = n * r + l * s),
                (t[1] = o * r + d * s),
                (t[2] = a * r + c * s),
                (t[3] = h * r + u * s),
                (t[4] = l * r - n * s),
                (t[5] = d * r - o * s),
                (t[6] = c * r - a * s),
                (t[7] = u * r - h * s));
            })(this._rotationMat4, this._rotationMat4, this._rotation[2])),
        null !== this.lookAt
          ? (Pt(this.matrix, this._position, this.lookAt, this.up),
            Pt(this._invLookatMat4, this._position, this.lookAt, this.up),
            Et(this._rotationMat4, this._invLookatMat4),
            Mt(this.matrix, this.matrix),
            At(this.matrix, this.matrix, this._scale))
          : (Tt(this.matrix, this.matrix, this._rotationMat4),
            At(this.matrix, this.matrix, this._scale)));
    }
    updateWorldMatrix() {
      (xt(this.worldMatrix),
        this.parent
          ? Tt(this.worldMatrix, this.parent.worldMatrix, this.matrix)
          : Et(this.worldMatrix, this.matrix),
        Mt(this.inverseWorldMatrix, this.worldMatrix),
        xt(this._normalMatrix, this._normalMatrix),
        Tt(this._normalMatrix, this._normalMatrix, this._rotationMat4));
      let t = this;
      for (; t.parent; )
        (Tt(this._normalMatrix, this._normalMatrix, t.parent._rotationMat4),
          (t = t.parent));
      this.children &&
        this.children?.forEach((t) => {
          (t.updateMatrix(), t.updateWorldMatrix());
        });
    }
  }
  function oe(t, e) {
    t &&
      (e(t),
      t.children &&
        t.children.forEach((t) => {
          oe(t, e);
        }));
  }
  class ae extends ne {
    constructor() {
      (super(),
        (this.visible = !0),
        (this.parent = null),
        (this.children = []));
    }
    traverse(t) {
      oe(this, t);
    }
    add(t) {
      let e = !1;
      for (let i = 0, s = this.children.length; i < s; i++)
        if (this.children[i] == t) {
          e = !0;
          break;
        }
      (e || this.children.push(t), (t.parent = this));
    }
    remove(t) {
      for (let e = 0, i = this.children.length; e < i; e++)
        if (this.children[e] == t) {
          ((t.parent = null), this.children.splice(e, 1));
          break;
        }
    }
    destroy() {
      for (let t = 0, e = this.children.length; t < e; t++)
        this.children[t].destroy();
      null !== this.parent && this.parent.removeChild(this);
    }
    render(t, e) {
      super.render();
      for (let i = 0, s = this.children.length; i < s; i++)
        this.children[i].visible && this.children[i].render(t, e);
    }
  }
  let he = Ct();
  class le extends ae {
    constructor(t) {
      (super(),
        (this.material = null),
        (this.geometry = null),
        (this.options = t || {}),
        (this.debug = t?.debug),
        (this._viewMatrix = _t()),
        (this._invViewMatrix = _t()),
        (this._modelViewMatrix = _t()),
        (this._projectViewMatrix = _t()),
        (this._projectionMatrix = _t()),
        (this.uniforms = {}),
        (this.bSphere = { center: Ct(), radius: 0 }));
    }
    updateWorldMatrix() {
      if ((super.updateWorldMatrix(), this.geometry)) {
        if (
          ((this.geometry._bSphere =
            this.geometry._bSphere || this.geometry.getBoundingSphere()),
          !this.geometry._bSphere)
        )
          return;
        (kt(this.bSphere.center, this.geometry._bSphere.center),
          It(this.bSphere.center, this.bSphere.center, this.worldMatrix),
          (function (t, e) {
            let i = e[0],
              s = e[1],
              r = e[2],
              n = e[4],
              o = e[5],
              a = e[6],
              h = e[8],
              l = e[9],
              d = e[10];
            ((t[0] = Math.sqrt(i * i + s * s + r * r)),
              (t[1] = Math.sqrt(n * n + o * o + a * a)),
              (t[2] = Math.sqrt(h * h + l * l + d * d)));
          })(he, this.worldMatrix),
          (this.bSphere.radius =
            this.geometry._bSphere.radius *
            Math.max(he[0], Math.max(he[1], he[2]))));
      }
    }
    render(t, e = {}) {
      let i = this.material,
        s = !1;
      if (
        (e.overrideMaterial && ((i = e.overrideMaterial), (s = !0)),
        e.overrideMaterial &&
          this.material &&
          this.material.defines.USE_INSTANCING &&
          e.overrideInstancedMaterial &&
          ((i = e.overrideInstancedMaterial), (s = !0)),
        e.overrideMaterial &&
          this.material &&
          this.material.defines.USE_INSTANCE_MATRIX_TEXTURE &&
          e.overrideInstancedTextureMatrixMaterial &&
          ((i = e.overrideInstancedTextureMatrixMaterial), (s = !0)),
        e.overrideMaterial &&
          this.material &&
          this.material.defines.USE_TERRAIN &&
          e.overrideTerrainMaterial &&
          ((i = e.overrideTerrainMaterial), (s = !0)),
        e.overrideMaterial &&
          this.material &&
          this.material.defines.USE_TERRAIN &&
          e.overrideInstancedTerrainMaterial &&
          this.material.defines.USE_INSTANCING &&
          ((i = e.overrideInstancedTerrainMaterial), (s = !0)),
        e.overrideMaterial &&
          this.material &&
          this.material.defines.USE_CLUSTER &&
          e.overrideClustersMaterial &&
          ((i = e.overrideClustersMaterial), (s = !0)),
        e.overrideMaterial &&
          this.material &&
          this.material.defines.USE_FOLIAGE_NEAR &&
          !this.material.defines.USE_AUTO_PLACEMENT &&
          e.overrideFoliageNearMaterial &&
          ((i = e.overrideFoliageNearMaterial), (s = !0)),
        e.overrideMaterial &&
          this.material &&
          this.material.defines.USE_FOLIAGE_NEAR &&
          this.material.defines.USE_AUTO_PLACEMENT &&
          e.overrideFoliageNearAutoMaterial &&
          ((i = e.overrideFoliageNearAutoMaterial), (s = !0)),
        e.overrideMaterial &&
          this.material &&
          this.material.defines.USE_FOLIAGE_IMPOSTOR &&
          !this.material.defines.USE_AUTO_PLACEMENT &&
          e.overrideFoliageImpostorMaterial &&
          ((i = e.overrideFoliageImpostorMaterial), (s = !0)),
        e.overrideMaterial &&
          this.material &&
          this.material.defines.USE_FOLIAGE_IMPOSTOR &&
          this.material.defines.USE_AUTO_PLACEMENT &&
          e.overrideFoliageImpostorAutoMaterial &&
          ((i = e.overrideFoliageImpostorAutoMaterial), (s = !0)),
        e.overrideMaterial &&
          this.material &&
          this.material.defines.USE_INSTANCE_MATRIX_TEXTURE &&
          e.overrideLandscapeGrassMesh &&
          ((i = e.overrideLandscapeGrassMesh), (s = !0)),
        i?.setUniform)
      ) {
        if (t && i && this.geometry) {
          if (!this.visible) return;
          (super.render(t, e),
            Et(this._viewMatrix, t.inverseWorldMatrix),
            Et(this._projectionMatrix, t.projectionMatrix),
            Tt(this._modelViewMatrix, this._viewMatrix, this.worldMatrix),
            Tt(this._projectViewMatrix, t.projectionMatrix, this._viewMatrix));
          let r = {};
          if (s) {
            for (let t in i.uniforms) r[t] = i.uniforms[t].value;
            for (let t in this.material.uniforms)
              i.setUniform(t, this.material.uniforms[t].value);
          }
          if (
            (i.setUniform("uCameraPosition", [
              t.worldMatrix[12],
              t.worldMatrix[13],
              t.worldMatrix[14],
            ]),
            i.setUniform("uNormalViewMatrix", t._normalMatrix),
            i.setUniform("uPMatrix", this._projectionMatrix),
            i.setUniform("uVMatrix", this._viewMatrix),
            i.setUniform("uNormalMatrix", this._normalMatrix),
            i.setUniform("uMMatrix", this.worldMatrix),
            i.setUniform("uInvMMatrix", this.inverseWorldMatrix),
            i.setUniform("uMVMatrix", this._modelViewMatrix),
            i.setUniform("uPVMatrix", this._projectViewMatrix),
            e.uniforms)
          ) {
            let t = Object.keys(e.uniforms);
            for (let s = 0; s < t.length; s++)
              i.setUniform(t[s], e.uniforms[t[s]]);
          }
          let n = Object.keys(this.uniforms);
          for (let t = 0; t < n.length; t++)
            i.setUniform(n[t], this.uniforms[n[t]]);
          let o = {};
          if (
            (e.overrideMaterial || e.overrideInstancedMaterial) &&
            this.material &&
            i.defines
          )
            for (let t in this.material.defines)
              i.defines[t] !== this.material.defines[t] &&
                (void 0 !== i.defines[t] && (o[t] = i.defines[t]),
                (i.defines[t] = this.material.defines[t]));
          if (e.defines) {
            i.inheritedDefines = i.inheritedDefines || new Set();
            for (let t in e.defines)
              i.defines[t] !== e.defines[t] &&
                (void 0 !== i.defines[t] && (o[t] = i.defines[t]),
                (i.defines[t] = e.defines[t]),
                i.inheritedDefines.has(t) || i.inheritedDefines.add(t));
            i.inheritedDefines?.forEach((t) => {
              i.defines[t] && !e.defines[t] && (delete i.defines[t], void 0);
            });
          }
          (i.gl &&
            ((i.gl.currentState = i.gl.currentState || {}),
            e?.overrides?.disable === i.gl.CULL_FACE
              ? i.gl.currentState.CULL_FACE_ENABLED &&
                ((i.gl.currentState.CULL_FACE_ENABLED = !1),
                (i.gl.currentState.CULL_FACE_MODE = null),
                i.gl.disable(i.gl.CULL_FACE),
                e?.overrides?.alphaPass && void 0)
              : e?.overrides?.enable === i.gl.CULL_FACE
                ? (i.gl.currentState.CULL_FACE_ENABLED ||
                    ((i.gl.currentState.CULL_FACE_ENABLED = !0),
                    i.gl.enable(i.gl.CULL_FACE),
                    e?.overrides?.alphaPass && void 0),
                  e?.overrides?.cullFace === i.gl.FRONT
                    ? i.gl.currentState.CULL_FACE_MODE !== i.gl.FRONT &&
                      ((i.gl.currentState.CULL_FACE_MODE = i.gl.FRONT),
                      i.gl.cullFace(i.gl.FRONT),
                      e?.overrides?.alphaPass && void 0)
                    : i.gl.currentState.CULL_FACE_MODE !== i.gl.BACK &&
                      ((i.gl.currentState.CULL_FACE_MODE = i.gl.BACK),
                      i.gl.cullFace(i.gl.BACK),
                      e?.overrides?.alphaPass && void 0))
                : this.backSided
                  ? (i.gl.currentState.CULL_FACE_ENABLED ||
                      ((i.gl.currentState.CULL_FACE_ENABLED = !0),
                      i.gl.enable(i.gl.CULL_FACE),
                      e?.overrides?.alphaPass && void 0),
                    i.gl.currentState.CULL_FACE_MODE !== i.gl.FRONT &&
                      ((i.gl.currentState.CULL_FACE_MODE = i.gl.FRONT),
                      i.gl.cullFace(i.gl.FRONT),
                      e?.overrides?.alphaPass && void 0))
                  : this.doubleSided || this.twoSided
                    ? i.gl.currentState.CULL_FACE_ENABLED &&
                      ((i.gl.currentState.CULL_FACE_ENABLED = !1),
                      (i.gl.currentState.CULL_FACE_MODE = null),
                      i.gl.disable(i.gl.CULL_FACE),
                      e?.overrides?.alphaPass && void 0)
                    : (i.gl.currentState.CULL_FACE_ENABLED ||
                        ((i.gl.currentState.CULL_FACE_ENABLED = !0),
                        i.gl.enable(i.gl.CULL_FACE),
                        e?.overrides?.alphaPass && void 0),
                      i.gl.currentState.CULL_FACE_MODE !== i.gl.BACK &&
                        ((i.gl.currentState.CULL_FACE_MODE = i.gl.BACK),
                        i.gl.cullFace(i.gl.BACK),
                        e?.overrides?.alphaPass && void 0))),
            this.options.beforeRender && this.options.beforeRender(this, i),
            i.beforeDraw?.(),
            i.draw(this.geometry, e),
            i.afterDraw?.());
          for (let t in o) i.defines[t] = o[t];
          if (s) for (let t in r) i.setUniform(t, r[t]);
          this.options?.afterRender && this.options?.afterRender();
        }
      } else void 0;
    }
  }
  class de {
    constructor(t) {
      let e;
      ((this.canvas = (t && t.canvas) || document.createElement("canvas")),
        (this.contextAttributes = Object.assign(
          {},
          {
            alpha: !1,
            depth: !0,
            stencil: !0,
            antialias: !1,
            premultipliedAlpha: !0,
            preserveDrawingBuffer: !1,
            failIfMajorPerformanceCaveat: !1,
          },
          t || {},
        )),
        (this._pixelRatio = 1));
      try {
        e = this.canvas.getContext("webgl2", this.contextAttributes);
      } catch (t) {
        try {
          e = this.canvas.getContext("webgl", this.contextAttributes);
        } catch (t) {
          e = null;
        }
      }
      ((this.gl = e),
        (this.supportWebgl = null !== e),
        this.supportWebgl
          ? ((this.handleContextLost = this.handleContextLost.bind(this)),
            (this.handleContextRestored =
              this.handleContextRestored.bind(this)),
            this.canvas.addEventListener(
              "webglcontextlost",
              this.handleContextLost,
              !1,
            ),
            this.canvas.addEventListener(
              "webglcontextrestored",
              this.handleContextRestored,
              !1,
            ))
          : console.warn("no Webgl support"));
    }
    handleContextLost(t) {
      t.preventDefault();
    }
    handleContextRestored() {}
    handleContextRestored() {}
    render(t, e, i, s = {}) {
      this.gl &&
        (i
          ? (i.bindFrame(s?.bindOnly), t.render(e), i.unbind())
          : (s?.skipViewport ||
              this.gl.viewport(
                0,
                0,
                this._width * this._pixelRatio,
                this._height * this._pixelRatio,
              ),
            t && t.render(e)));
    }
    resize(t, e) {
      this.gl &&
        ((this._width = t),
        (this._height = e),
        (this.canvas.width = this._width * this._pixelRatio),
        (this.canvas.height = this._height * this._pixelRatio),
        this.gl.viewport(
          0,
          0,
          this._width * this._pixelRatio,
          this._height * this._pixelRatio,
        ));
    }
    clearColor(t, e, i, s) {
      this.gl && this.gl.clearColor(t, e, i, s);
    }
    clear(t, e, i) {
      if (this.gl) {
        var s = 0;
        ((void 0 === t || t) && (s |= this.gl.COLOR_BUFFER_BIT),
          (void 0 === e || e) && (s |= this.gl.DEPTH_BUFFER_BIT),
          (void 0 === i || i) && (s |= this.gl.STENCIL_BUFFER_BIT),
          this.gl.clear(s));
      }
    }
    setPixelRatio(t) {
      ((this._pixelRatio = t), this.resize(this._width, this._height));
    }
  }
  let ce = Ct();
  class ue {
    constructor() {
      ((this.normal = Ct()), (this.w = 0));
    }
    distanceToPoint(t) {
      return Nt(this.normal, t) + this.w;
    }
    setComponents(t, e, i, s) {
      return (Dt(this.normal, t, e, i), (this.w = s), this);
    }
    normalize() {
      let t = 1 / Lt(this.normal);
      return (Ot(this.normal, this.normal, t), (this.w *= t), this);
    }
  }
  class pe {
    constructor() {
      this.planes = [];
      for (var t = 0; t < 6; t++) this.planes.push(new ue());
    }
    intersectsSphere(t) {
      for (let e = 0; e < 6; e++) {
        if (this.planes[e].distanceToPoint(t.center) < -t.radius) return !1;
      }
      return !0;
    }
    intersectsBox(t) {
      for (var e = this.planes, i = 0; i < 6; i++) {
        var s = e[i];
        if (
          ((ce[0] = s.normal[0] > 0 ? t.max[0] : t.min[0]),
          (ce[1] = s.normal[1] > 0 ? t.max[1] : t.min[1]),
          (ce[2] = s.normal[2] > 0 ? t.max[2] : t.min[2]),
          s.distanceToPoint(ce) < 0)
        )
          return !1;
      }
      return !0;
    }
    setFromProjectionMatrix(t) {
      (this.planes[0]
        .setComponents(t[3] - t[0], t[7] - t[4], t[11] - t[8], t[15] - t[12])
        .normalize(),
        this.planes[1]
          .setComponents(t[3] + t[0], t[7] + t[4], t[11] + t[8], t[15] + t[12])
          .normalize(),
        this.planes[2]
          .setComponents(t[3] + t[1], t[7] + t[5], t[11] + t[9], t[15] + t[13])
          .normalize(),
        this.planes[3]
          .setComponents(t[3] - t[1], t[7] - t[5], t[11] - t[9], t[15] - t[13])
          .normalize(),
        this.planes[4]
          .setComponents(t[3] - t[2], t[7] - t[6], t[11] - t[10], t[15] - t[14])
          .normalize(),
        this.planes[5]
          .setComponents(t[3] + t[2], t[7] + t[6], t[11] + t[10], t[15] + t[14])
          .normalize());
    }
  }
  function fe() {
    let t = new wt(2);
    return ((t[0] = 0), (t[1] = 0), t);
  }
  function me(t, e, i) {
    return ((t[0] = e), (t[1] = i), t);
  }
  function ge(t, e, i) {
    return ((t[0] = e[0] - i[0]), (t[1] = e[1] - i[1]), t);
  }
  function be(t, e, i) {
    return ((t[0] = e[0] * i[0]), (t[1] = e[1] * i[1]), t);
  }
  function ve(t, e, i) {
    return ((t[0] = e[0] / i[0]), (t[1] = e[1] / i[1]), t);
  }
  function we(t, e) {
    var i = e[0] - t[0],
      s = e[1] - t[1];
    return Math.sqrt(i * i + s * s);
  }
  function ye(t, e) {
    var i = e[0] - t[0],
      s = e[1] - t[1];
    return i * i + s * s;
  }
  function _e(t) {
    var e = t[0],
      i = t[1];
    return Math.sqrt(e * e + i * i);
  }
  function Ee(t) {
    var e = t[0],
      i = t[1];
    return e * e + i * i;
  }
  function xe(t, e) {
    var i = e[0],
      s = e[1],
      r = i * i + s * s;
    return (
      r > 0 && ((r = 1 / Math.sqrt(r)), (t[0] = e[0] * r), (t[1] = e[1] * r)),
      t
    );
  }
  const Me = _e,
    Te = ge,
    Ae = be,
    Se = ve,
    Pe = we,
    Ce = ye,
    Le = Ee,
    Re = (function () {
      let t = fe();
      return function (e, i, s, r, n, o) {
        let a, h;
        for (
          i || (i = 2),
            s || (s = 0),
            h = r ? Math.min(r * i + s, e.length) : e.length,
            a = s;
          a < h;
          a += i
        )
          ((t[0] = e[a]),
            (t[1] = e[a + 1]),
            n(t, t, o),
            (e[a] = t[0]),
            (e[a + 1] = t[1]));
        return e;
      };
    })();
  var ke = Object.freeze({
    __proto__: null,
    create: fe,
    clone: function (t) {
      let e = new wt(2);
      return ((e[0] = t[0]), (e[1] = t[1]), e);
    },
    fromValues: function (t, e) {
      let i = new wt(2);
      return ((i[0] = t), (i[1] = e), i);
    },
    copy: function (t, e) {
      return ((t[0] = e[0]), (t[1] = e[1]), t);
    },
    set: me,
    add: function (t, e, i) {
      return ((t[0] = e[0] + i[0]), (t[1] = e[1] + i[1]), t);
    },
    subtract: ge,
    multiply: be,
    divide: ve,
    ceil: function (t, e) {
      return ((t[0] = Math.ceil(e[0])), (t[1] = Math.ceil(e[1])), t);
    },
    floor: function (t, e) {
      return ((t[0] = Math.floor(e[0])), (t[1] = Math.floor(e[1])), t);
    },
    min: function (t, e, i) {
      return ((t[0] = Math.min(e[0], i[0])), (t[1] = Math.min(e[1], i[1])), t);
    },
    max: function (t, e, i) {
      return ((t[0] = Math.max(e[0], i[0])), (t[1] = Math.max(e[1], i[1])), t);
    },
    round: function (t, e) {
      return ((t[0] = Math.round(e[0])), (t[1] = Math.round(e[1])), t);
    },
    scale: function (t, e, i) {
      return ((t[0] = e[0] * i), (t[1] = e[1] * i), t);
    },
    scaleAndAdd: function (t, e, i, s) {
      return ((t[0] = e[0] + i[0] * s), (t[1] = e[1] + i[1] * s), t);
    },
    distance: we,
    squaredDistance: ye,
    length: _e,
    squaredLength: Ee,
    negate: function (t, e) {
      return ((t[0] = -e[0]), (t[1] = -e[1]), t);
    },
    inverse: function (t, e) {
      return ((t[0] = 1 / e[0]), (t[1] = 1 / e[1]), t);
    },
    normalize: xe,
    dot: function (t, e) {
      return t[0] * e[0] + t[1] * e[1];
    },
    cross: function (t, e, i) {
      var s = e[0] * i[1] - e[1] * i[0];
      return ((t[0] = t[1] = 0), (t[2] = s), t);
    },
    lerp: function (t, e, i, s) {
      var r = e[0],
        n = e[1];
      return ((t[0] = r + s * (i[0] - r)), (t[1] = n + s * (i[1] - n)), t);
    },
    random: function (t, e) {
      e = e || 1;
      var i = 2 * yt() * Math.PI;
      return ((t[0] = Math.cos(i) * e), (t[1] = Math.sin(i) * e), t);
    },
    transformMat2: function (t, e, i) {
      var s = e[0],
        r = e[1];
      return ((t[0] = i[0] * s + i[2] * r), (t[1] = i[1] * s + i[3] * r), t);
    },
    transformMat2d: function (t, e, i) {
      var s = e[0],
        r = e[1];
      return (
        (t[0] = i[0] * s + i[2] * r + i[4]),
        (t[1] = i[1] * s + i[3] * r + i[5]),
        t
      );
    },
    transformMat3: function (t, e, i) {
      var s = e[0],
        r = e[1];
      return (
        (t[0] = i[0] * s + i[3] * r + i[6]),
        (t[1] = i[1] * s + i[4] * r + i[7]),
        t
      );
    },
    transformMat4: function (t, e, i) {
      let s = e[0],
        r = e[1];
      return (
        (t[0] = i[0] * s + i[4] * r + i[12]),
        (t[1] = i[1] * s + i[5] * r + i[13]),
        t
      );
    },
    str: function (t) {
      return "vec2(" + t[0] + ", " + t[1] + ")";
    },
    exactEquals: function (t, e) {
      return t[0] === e[0] && t[1] === e[1];
    },
    equals: function (t, e) {
      let i = t[0],
        s = t[1],
        r = e[0],
        n = e[1];
      return (
        Math.abs(i - r) <= vt * Math.max(1, Math.abs(i), Math.abs(r)) &&
        Math.abs(s - n) <= vt * Math.max(1, Math.abs(s), Math.abs(n))
      );
    },
    len: Me,
    sub: Te,
    mul: Ae,
    div: Se,
    dist: Pe,
    sqrDist: Ce,
    sqrLen: Le,
    forEach: Re,
  });
  const De = "ontouchstart" in window || navigator.msMaxTouchPoints > 0,
    Fe = !!window.navigator.pointerEnabled,
    Ue = !!window.navigator.msPointerEnabled,
    Oe = De
      ? "touchstart"
      : Fe
        ? "pointerdown"
        : Ue
          ? "MSPointerDown"
          : "mousedown",
    $e = De
      ? "touchmove"
      : Fe
        ? "pointermove"
        : Ue
          ? "MSPointerMove"
          : "mousemove",
    Ne = De ? "touchend" : Fe ? "pointerup" : Ue ? "MSPointerUp" : "mouseup";
  class Be extends ne {
    constructor(t) {
      (super(),
        (this.touchEventPageX = 0),
        (this.touchEventPageY = 0),
        (this._onPointerDown = this._onPointerDown.bind(this)),
        (this._onPointerMove = this._onPointerMove.bind(this)),
        (this._onPointerUp = this._onPointerUp.bind(this)),
        (this._onMouseWheel = this._onMouseWheel.bind(this)),
        (this.onContextMenu = this.onContextMenu.bind(this)),
        (this._handleOrientation = this._handleOrientation.bind(this)),
        (this._projScreenMatrix = _t()),
        (t = Object.assign(
          {},
          {
            fov: 45,
            aspect: window.innerWidth / window.innerHeight,
            near: 10,
            far: 1e3,
            type: "perspective",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            orbitControl: !1,
            wheel: !0,
            lookAt: null,
            pointerParent: document,
            firstPerson: !1,
            lookAround: !1,
            playerCamera: !1,
            tilt: !1,
            moveSpeed: 1,
            wheelSpeed: 1,
            distance: 20,
            position: [0, 0, 0],
            frustum: !1,
            cameraDistance: 100,
            theta: 0,
            phi: 0,
            minTheta: -Math.PI,
            maxTheta: Math.PI,
            minPhi: -Math.PI,
            maxPhi: Math.PI,
            minCameraDistance: 0,
            maxCameraDistance: 1e4,
            offset: [0, 0, 0],
            drag: !1,
            heightMap: null,
            landscapeSize: [0, 0],
            useCameraRotationEase: !0,
            reverseCameraRotation: !0,
            cameraTiltTheta: 0.1,
            cameraTiltPhi: 0.05,
            useTilt: !1,
            useRail: !1,
            followTerrain: !1,
            useCollision: !1,
            minPolarAngle: -1 * Math.PI,
            maxPolarAngle: 1 * Math.PI,
            skipGlobalSettings: !1,
            thetaSmoothing: 0.1,
            phiSmoothing: 0.8,
          },
          t,
        )),
        (this.useTilt = t.useTilt),
        (this.useRail = t.useRail),
        (this.followTerrain = t.followTerrain),
        (this.useCollision = t.useCollision),
        (this.skipGlobalSettings = t.skipGlobalSettings),
        (this.extraTheta = 0),
        (this.extraPhi = 0),
        (this._cameraTiltTheta = t.cameraTiltTheta),
        (this._cameraTiltPhi = t.cameraTiltPhi),
        (this.heightMap = t.heightMap),
        (this.landscapeSize = t.landscapeSize),
        (this.playerCamera = t.playerCamera),
        (this.drag = t.drag),
        (this.dragDirX = fe()),
        (this.dragDirY = fe()),
        (this.offset = t.offset),
        (this.minCameraDistance = t.minCameraDistance),
        (this.maxCameraDistance = t.maxCameraDistance),
        (this.minPolarAngle = t.minPolarAngle),
        (this.maxPolarAngle = t.maxPolarAngle),
        (this.theta = t.theta),
        (this.phi = t.phi),
        (this.currTheta = this.theta),
        (this.currPhi = this.phi),
        (this.pointerTheta = 0),
        (this.pointerPhi = 0),
        (this.currPointerPhi = 0),
        (this.currPointerTheta = 0),
        (this.useCameraRotationEase = t.useCameraRotationEase),
        (this.reverseCameraRotation = t.reverseCameraRotation),
        (this.minTheta = t.minTheta),
        (this.maxTheta = t.maxTheta),
        (this.minPhi = t.minPhi),
        (this.maxPhi = t.maxPhi),
        (this.frustum = t.frustum ? new pe() : null),
        (this.lookAt = t.lookAt),
        (this.fov = t.fov),
        (this.aspect = t.aspect),
        (this.near = t.near),
        (this.far = t.far),
        (this.type = t.type),
        (this.left = t.left),
        (this.right = t.right),
        (this.top = t.top),
        (this.bottom = t.bottom),
        (this.orbitControl = t.orbitControl),
        (this.tilt = t.tilt),
        (this.firstPerson = t.firstPerson),
        (this.lookAround = t.lookAround),
        (this.wheel = t.wheel),
        (this.thetaSmoothing = t.thetaSmoothing),
        (this.phiSmoothing = t.phiSmoothing),
        (this.projectionMatrix = _t()),
        (this.inverseProjectionMatrix = _t()),
        this.updateProjectionMatrix(),
        (this.orbitControl ||
          this.tilt ||
          this.firstPerson ||
          this.lookAround) &&
          (this.lookAt || ((this.lookAt = Ct()), Dt(this.lookAt, 0, 0, 0)),
          (this.originalLookAt = Ct()),
          kt(this.originalLookAt, this.lookAt),
          (this._pointerParent = t.pointerParent),
          this._initPointerEvents(),
          (this._cameraDistance = t.cameraDistance)),
        this.firstPerson &&
          (document.addEventListener(
            "contextmenu",
            this.onContextMenu.bind(this),
            !1,
          ),
          document.addEventListener("keydown", this.onKeyDown.bind(this), !1),
          document.addEventListener("keyup", this.onKeyUp.bind(this), !1)),
        (this.pitchObject = new ae()),
        (this.pitchObject.id = this.pitchObject.name = "Camera__pitchObject"),
        (this.yawObject = new ae()),
        (this.yawObject.id = this.yawObject.name = "Camera__yawObject"),
        this.yawObject.add(this.pitchObject),
        (this.moveSpeed = t.moveSpeed),
        (this.wheelSpeed = t.wheelSpeed),
        (this.time = Date.now()),
        (this._velocity = Ct()),
        (this._moveForward = !1),
        (this._moveBackward = !1),
        (this._moveLeft = !1),
        (this._moveRight = !1),
        (this._moveUp = !1),
        (this._camera = Ct()),
        (this._oldPosition = Ct()),
        (this.position[0] = t.position[0]),
        (this.position[1] = t.position[1]),
        (this.position[2] = t.position[2]),
        (this._oldPosition[0] = this.position[0]),
        (this._oldPosition[1] = this.position[1]),
        (this._oldPosition[2] = this.position[2]),
        (this.currPointerXMove = 0),
        (this.currPointerYMove = 0));
    }
    updateProjectionMatrix() {
      ("perspective" == this.type
        ? (function (t, e, i, s, r) {
            let n = 1 / Math.tan(e / 2),
              o = 1 / (s - r);
            ((t[0] = n / i),
              (t[1] = 0),
              (t[2] = 0),
              (t[3] = 0),
              (t[4] = 0),
              (t[5] = n),
              (t[6] = 0),
              (t[7] = 0),
              (t[8] = 0),
              (t[9] = 0),
              (t[10] = (r + s) * o),
              (t[11] = -1),
              (t[12] = 0),
              (t[13] = 0),
              (t[14] = 2 * r * s * o),
              (t[15] = 0));
          })(
            this.projectionMatrix,
            (this.fov * Math.PI) / 180,
            this.aspect,
            this.near,
            this.far,
          )
        : ("orthographic" != this.type && "ortho" != this.type) ||
          (function (t, e, i, s, r, n, o) {
            let a = 1 / (e - i),
              h = 1 / (s - r),
              l = 1 / (n - o);
            ((t[0] = -2 * a),
              (t[1] = 0),
              (t[2] = 0),
              (t[3] = 0),
              (t[4] = 0),
              (t[5] = -2 * h),
              (t[6] = 0),
              (t[7] = 0),
              (t[8] = 0),
              (t[9] = 0),
              (t[10] = 2 * l),
              (t[11] = 0),
              (t[12] = (e + i) * a),
              (t[13] = (r + s) * h),
              (t[14] = (o + n) * l),
              (t[15] = 1));
          })(
            this.projectionMatrix,
            this.left,
            this.right,
            this.bottom,
            this.top,
            this.near,
            this.far,
          ),
        Mt(this.inverseProjectionMatrix, this.projectionMatrix));
    }
    _initPointerEvents() {
      ((this.winWidth = window.innerWidth),
        (this.winHeight = window.innerHeight),
        (this._isPointerDown = !1),
        (this.isRightClick = !1),
        (this.pointerXMove = 0),
        (this.pointerYMove = 0),
        (this.pointerX = 0),
        (this.pointerY = 0),
        (this.pointerZ = 0),
        (this.lastPointerX = 0),
        (this.lastPointerY = 0),
        (this.lastPointerZ = 0),
        (this.thetaDown = this.theta),
        (this.phiDown = this.phi),
        this._pointerParent.addEventListener(Oe, this._onPointerDown, {
          passive: !1,
        }),
        document.addEventListener($e, this._onPointerMove, { passive: !1 }),
        document.addEventListener(Ne, this._onPointerUp, !1),
        this._pointerParent.addEventListener(
          "contextmenu",
          this.onContextMenu,
          !1,
        ),
        this.wheel &&
          (this._pointerParent.addEventListener(
            "DOMMouseScroll",
            this._onMouseWheel,
          ),
          this._pointerParent.addEventListener(
            "mousewheel",
            this._onMouseWheel,
          )));
    }
    delete() {
      (this._pointerParent.removeEventListener(Oe, this._onPointerDown, !1),
        document.removeEventListener($e, this._onPointerMove, !1),
        document.removeEventListener(Ne, this._onPointerUp, !1),
        this._pointerParent.removeEventListener(
          "contextmenu",
          this.onContextMenu,
          !1,
        ),
        this.wheel &&
          (this._pointerParent.removeEventListener(
            "DOMMouseScroll",
            this._onMouseWheel,
          ),
          this._pointerParent.removeEventListener(
            "mousewheel",
            this._onMouseWheel,
          )),
        document.removeEventListener("keydown", this.onKeyDown, !1),
        document.removeEventListener("keyup", this.onKeyUp, !1));
    }
    destroy() {
      this.delete();
    }
    onContextMenu(t) {
      this.disabled || event.preventDefault();
    }
    onKeyDown(t) {
      if (!this.disabled)
        switch (t.keyCode) {
          case 87:
            this._moveForward = !0;
            break;
          case 65:
            this._moveLeft = !0;
            break;
          case 83:
            this._moveBackward = !0;
            break;
          case 68:
            this._moveRight = !0;
            break;
          case 32:
            this._velocity[1] += 5;
        }
    }
    onKeyUp(t) {
      if (!this.disabled)
        switch (t.keyCode) {
          case 38:
          case 87:
            this._moveForward = !1;
            break;
          case 37:
          case 65:
            this._moveLeft = !1;
            break;
          case 40:
          case 83:
            this._moveBackward = !1;
            break;
          case 39:
          case 68:
            this._moveRight = !1;
        }
    }
    _onMouseWheel(t) {
      var e;
      this.disabled ||
        (t.wheelDelta
          ? (e = t.wheelDelta)
          : t.detail
            ? (e = 40 * -t.detail)
            : t.wheelDeltaX
              ? ((e = t.wheelDeltaY / 12), t.wheelDeltaX)
              : (e = (void 0 !== t.axis && (t.axis, t.HORIZONTAL_AXIS), 0)),
        (this._cameraDistance += -1 * e * this.wheelSpeed),
        (this._cameraDistance = Math.min(
          this.maxCameraDistance,
          Math.max(this.minCameraDistance, this._cameraDistance),
        )));
    }
    disable() {
      this.disabled = !0;
    }
    enable() {
      this.disabled = !1;
    }
    _onPointerDown(t) {
      this.disabled ||
        (3 == t.which && (this.isRightClick = !0),
        document.body.classList.add("is-dragging"),
        (this._isPointerDown = !0),
        (this.touchEvent = De ? t.touches[0] || t.changedTouches[0] : t),
        (this.touchEventPageX = this.touchEvent.pageX),
        (this.touchEventPageY = this.touchEvent.pageY),
        (this.touchEventPageX -=
          window.pageXOffset || document.documentElement.scrollLeft),
        (this.touchEventPageY -=
          window.pageYOffset || document.documentElement.scrollTop),
        (this.pointerXDown = this.touchEventPageX),
        (this.pointerYDown = this.touchEventPageY),
        (this.startPointerX = this.pointerXMove),
        (this.startPointerY = this.pointerYMove),
        this.drag &&
          (me(this.dragDirY, this.position[0], this.position[2]),
          ge(this.dragDirY, this.dragDirY, [this.lookAt[0], this.lookAt[2]]),
          xe(this.dragDirY, this.dragDirY),
          me(this.dragDirX, this.dragDirY[1], -this.dragDirY[0])),
        this.tilt ||
          ((this.thetaDown = this.theta), (this.phiDown = this.phi)));
    }
    _handleOrientation() {}
    _onPointerMove(t) {
      if (
        (this._isPointerDown ||
          document.pointerLockElement ||
          this.lookAround ||
          this.tilt) &&
        !this.disabled
      ) {
        if (
          (this._isPointerDown &&
            (t.preventDefault(), De && t.stopPropagation()),
          this._isPointerDown && this.drag)
        ) {
          let e = De ? t.touches[0] || t.changedTouches[0] : t,
            i = e.pageX,
            s = e.pageY;
          return (
            (s -= window.pageYOffset || document.documentElement.scrollTop),
            (this.pointerXMove =
              this.startPointerX +
              this.dragDirY[0] * (s - this.pointerYDown) * -1 +
              this.dragDirX[0] * (i - this.pointerXDown) * -1 * 0.5),
            void (this.pointerYMove =
              this.startPointerY +
              this.dragDirY[1] * (s - this.pointerYDown) * -1 +
              this.dragDirX[1] * (i - this.pointerXDown) * -1 * 0.5)
          );
        }
        document.pointerLockElement
          ? ((this.touchEvent = t),
            (this.touchEventPageX += this.touchEvent.movementX),
            (this.touchEventPageY += this.touchEvent.movementY),
            (this.touchEventPageY = Math.max(
              0,
              Math.min(window.innerHeight, this.touchEventPageY),
            )),
            (this.pointerXOrbiter = this.touchEventPageX),
            (this.pointerYOrbiter = this.touchEventPageY),
            (this.theta =
              (this.pointerXOrbiter / window.innerWidth - 0.5) * Math.PI * -1),
            (this.phi =
              (this.pointerYOrbiter / window.innerHeight - 0.5) * Math.PI))
          : ((this.touchEvent = De ? t.touches[0] || t.changedTouches[0] : t),
            (this.touchEventPageX = this.touchEvent.pageX),
            (this.touchEventPageY = this.touchEvent.pageY),
            (this.touchEventPageY -=
              window.pageYOffset || document.documentElement.scrollTop),
            this.lookAround || this.tilt
              ? this.tilt
                ? ((this.pointerXOrbiter = this.touchEventPageX),
                  (this.pointerYOrbiter = this.touchEventPageY),
                  (this.theta =
                    this.thetaDown +
                    ((2 *
                      (this.pointerXOrbiter / window.innerWidth - 0.5) *
                      Math.PI) /
                      10) *
                      -1),
                  (this.phi =
                    this.phiDown +
                    (2 *
                      (this.pointerYOrbiter / window.innerHeight - 0.5) *
                      Math.PI) /
                      30),
                  (this.phi = Math.max(
                    this.minPhi,
                    Math.min(this.maxPhi, this.phi),
                  )),
                  (this.theta = Math.max(
                    this.minTheta,
                    Math.min(this.maxTheta, this.theta),
                  )))
                : (this.playerCamera
                    ? (this._isPointerDown &&
                        ((this.pointerXOrbiter =
                          this.pointerXDown - this.touchEventPageX),
                        (this.pointerYOrbiter =
                          this.pointerYDown - this.touchEventPageY),
                        (this.theta =
                          this.thetaDown +
                          (((this.pointerXOrbiter / window.innerWidth) *
                            2 *
                            Math.PI) /
                            4) *
                            -1),
                        (this.phi =
                          this.phiDown +
                          (((this.pointerYOrbiter / window.innerHeight) *
                            2 *
                            Math.PI) /
                            8) *
                            -1)),
                      (this.pointerTheta =
                        2 *
                        (this.touchEventPageX / window.innerWidth - 0.5) *
                        this._cameraTiltTheta *
                        -1),
                      (this.pointerPhi =
                        2 *
                        (this.touchEventPageY / window.innerHeight - 0.5) *
                        this._cameraTiltPhi *
                        -1))
                    : ((this.pointerXOrbiter = this.touchEventPageX),
                      (this.pointerYOrbiter = this.touchEventPageY),
                      (this.theta =
                        2 *
                        (this.pointerXOrbiter / window.innerWidth - 0.5) *
                        Math.PI *
                        0.4 *
                        -1),
                      (this.phi =
                        2 *
                        (this.pointerYOrbiter / window.innerHeight - 0.5) *
                        Math.PI *
                        0.125 *
                        -1)),
                  (this.phi = Math.max(
                    this.minPolarAngle,
                    Math.min(this.maxPolarAngle, this.phi),
                  )),
                  (this.theta = Math.max(
                    this.minTheta,
                    Math.min(this.maxTheta, this.theta),
                  )))
              : this.firstPerson && this.reverseCameraRotation
                ? ((this.pointerXMove =
                    this.startPointerX +
                    (this.touchEventPageX - this.pointerXDown)),
                  (this.pointerYMove =
                    this.startPointerY +
                    (this.touchEventPageY - this.pointerYDown)),
                  (this.pointerXOrbiter =
                    this.pointerXDown - this.touchEventPageX),
                  (this.pointerYOrbiter =
                    this.pointerYDown - this.touchEventPageY),
                  (this.theta =
                    this.thetaDown +
                    (this.pointerXOrbiter / window.innerWidth) *
                      2 *
                      Math.PI *
                      0.5 *
                      -1),
                  (this.phi =
                    this.phiDown +
                    (this.pointerYOrbiter / window.innerHeight) *
                      2 *
                      Math.PI *
                      0.2),
                  (this.phi = Math.max(
                    this.minPolarAngle,
                    Math.min(this.maxPolarAngle, this.phi),
                  )))
                : ((this.pointerXMove =
                    this.startPointerX +
                    (this.touchEventPageX - this.pointerXDown)),
                  (this.pointerYMove =
                    this.startPointerY +
                    (this.touchEventPageY - this.pointerYDown)),
                  (this.pointerXOrbiter =
                    this.pointerXDown - this.touchEventPageX),
                  (this.pointerYOrbiter =
                    this.pointerYDown - this.touchEventPageY),
                  (this.theta =
                    this.thetaDown +
                    (this.pointerXOrbiter / window.innerWidth) * 2 * Math.PI),
                  (this.phi =
                    this.phiDown +
                    (this.pointerYOrbiter / window.innerHeight) *
                      2 *
                      Math.PI *
                      -1),
                  (this.phi = Math.max(
                    this.minPolarAngle,
                    Math.min(this.maxPolarAngle, this.phi),
                  ))));
      }
    }
    _onPointerUp() {
      ((this._isPointerDown = !1),
        (this.isRightClick = !1),
        document.body.classList.remove("is-dragging"));
    }
    freeze() {
      this.isFrozen = !0;
    }
    unfreeze() {
      this.isFrozen = !1;
    }
    update(t) {
      if (!this.isFrozen && !this.disabled) {
        if (this.orbitControl)
          ((this.currTheta +=
            (this.theta - this.currTheta) * this.thetaSmoothing),
            (this.currPhi += 0.8 * (this.phi - this.currPhi)),
            (this.position[0] =
              this.offset[0] +
              Math.sin(this.currTheta) *
                Math.cos(this.currPhi) *
                this._cameraDistance),
            (this.position[1] =
              this.offset[1] + Math.sin(this.currPhi) * this._cameraDistance),
            (this.position[2] =
              this.offset[2] +
              Math.cos(this.currTheta) *
                Math.cos(this.currPhi) *
                this._cameraDistance),
            (this.lookAt[0] = this.offset[0]),
            (this.lookAt[1] = this.offset[1]),
            (this.lookAt[2] = this.offset[2]),
            super.render(!0));
        else if (this.tilt) {
          ((this.currTheta += 0.05 * (this.theta - this.currTheta)),
            (this.currPhi += 0.05 * (this.phi - this.currPhi)));
          let t = Ct();
          (kt(t, this.position),
            Ut(t, t, this.lookAt),
            $t(t, t),
            (this.currPointerXMove +=
              0.15 * (this.pointerXMove - this.currPointerXMove)),
            (this.currPointerYMove +=
              0.15 * (this.pointerYMove - this.currPointerYMove)),
            (this.position[0] =
              this.offset[0] +
              this.currPointerXMove +
              Math.sin(this.currTheta) *
                Math.cos(this.currPhi) *
                this._cameraDistance),
            (this.position[1] =
              this.offset[1] + Math.sin(this.currPhi) * this._cameraDistance),
            (this.position[2] =
              this.offset[2] +
              this.currPointerYMove +
              Math.cos(this.currTheta) *
                Math.cos(this.currPhi) *
                this._cameraDistance),
            (this.lookAt[0] =
              this.offset[0] +
              this.currPointerXMove +
              Math.sin(this.currTheta) *
                Math.cos(this.currPhi) *
                this._cameraDistance *
                -1),
            (this.lookAt[1] =
              this.offset[1] +
              Math.sin(this.currPhi) * this._cameraDistance * -1),
            (this.lookAt[2] =
              this.offset[2] +
              this.currPointerYMove +
              Math.cos(this.currTheta) *
                Math.cos(this.currPhi) *
                this._cameraDistance *
                -1),
            super.render(!0));
        } else if (this.lookAround) {
          if (!t) {
            let t = Date.now();
            this.lastTiltTime = this.lastTiltTime || Date.now();
            let e = (t - this.lastTiltTime) / 1e3;
            this.lastTiltTime = t;
            const i = (e / 0.016) * 0.07,
              s = (e / 0.016) * 0.05;
            ((this.currTheta += (this.theta - this.currTheta) * i),
              (this.currPhi += (this.phi - this.currPhi) * i),
              (this.currPointerTheta +=
                (this.pointerTheta - this.currPointerTheta) * s),
              (this.currPointerPhi +=
                (this.pointerPhi - this.currPointerPhi) * s));
          }
          ((this.lookAt[0] =
            this.offset[0] +
            Math.sin(
              this.currTheta + this.currPointerTheta + (this.extraTheta || 0),
            ) *
              Math.cos(this.currPhi + this.currPointerPhi) *
              100),
            (this.lookAt[1] =
              this.offset[1] +
              100 *
                Math.sin(
                  this.currPhi + this.currPointerPhi + (this.extraPhi || 0),
                )),
            (this.lookAt[2] =
              this.offset[2] +
              Math.cos(
                this.currTheta + this.currPointerTheta + (this.extraTheta || 0),
              ) *
                Math.cos(this.currPhi + this.currPointerPhi) *
                100),
            (this.position[0] = this.offset[0]),
            (this.position[1] = this.offset[1]),
            (this.position[2] = this.offset[2]),
            super.render());
        } else if (this.firstPerson) {
          let i = Date.now(),
            s = (i - this.time) / 1e3;
          if (((this.prevTime = i), (s = Math.min(1e3 / 30, s)), !t)) {
            let t = Date.now();
            this.lastTiltTime = this.lastTiltTime || Date.now();
            let e = (t - this.lastTiltTime) / 1e3;
            this.lastTiltTime = t;
            const i = (e / 0.016) * 0.1;
            ((this.currTheta +=
              (this.theta - this.currTheta) *
              (this.useCameraRotationEase ? i : 0.5)),
              (this.currPhi +=
                (this.phi - this.currPhi) *
                (this.useCameraRotationEase ? i : 0.5)));
          }
          ((this._oldPosition[0] = this.position[0] + this.offset[0]),
            (this._oldPosition[1] = this.position[1] + this.offset[1]),
            (this._oldPosition[2] = this.position[2] + this.offset[2]),
            (this.position[0] = 0),
            (this.position[1] = 0),
            (this.position[2] = 0),
            (this.lookAt[0] =
              Math.sin(this.currTheta + this.extraTheta) *
              Math.cos(this.currPhi) *
              100),
            (this.lookAt[1] =
              100 * Math.sin(this.currPhi + (this.extraPhi || 0)) * -1),
            (this.lookAt[2] =
              Math.cos(this.currTheta + this.extraTheta) *
              Math.cos(this.currPhi) *
              100),
            this.updateMatrix());
          var e = _t();
          Et(e, this.matrix);
          let r = Ct();
          (this._moveForward && Ft(r, r, [0, 0, -1]),
            this._moveBackward && Ft(r, r, [0, 0, 1]),
            this._moveLeft && Ft(r, r, [-1, 0, 0]),
            this._moveRight && Ft(r, r, [1, 0, 0]),
            $t(r, r),
            (r = (function (t, e) {
              const i = 1 / (e[3] * t[0] + e[7] * t[1] + e[11] * t[2] + e[15]);
              return [
                (e[0] * t[0] + e[4] * t[1] + e[8] * t[2] + e[12]) * i,
                (e[1] * t[0] + e[5] * t[1] + e[9] * t[2] + e[13]) * i,
                (e[2] * t[0] + e[6] * t[1] + e[10] * t[2] + e[14]) * i,
              ];
            })(r, e)),
            $t(r, r),
            Ot(r, r, 20 * this.moveSpeed),
            Ot(r, r, s),
            Ft(this._velocity, this._velocity, r),
            (this.position[0] = this._oldPosition[0] + this._velocity[0] * s),
            (this.position[1] = this._oldPosition[1] + this._velocity[1] * s),
            (this.position[2] = this._oldPosition[2] + this._velocity[2] * s),
            (this._velocity[0] *= 0.9),
            (this._velocity[1] *= 0.9),
            (this._velocity[2] *= 0.9),
            (this.time = i),
            (this.lookAt[0] =
              Math.sin(this.currTheta + this.extraTheta) *
                Math.cos(this.currPhi) *
                100 +
              this.position[0]),
            (this.lookAt[1] =
              100 * Math.sin(this.currPhi + (this.extraPhi || 0)) * -1 +
              this.position[1]),
            (this.lookAt[2] =
              Math.cos(this.currTheta + this.extraTheta) *
                Math.cos(this.currPhi) *
                100 +
              this.position[2]),
            this.updateMatrix(),
            this.updateWorldMatrix());
        } else super.render(!0);
        this.frustum &&
          (Tt(
            this._projScreenMatrix,
            this.projectionMatrix,
            this.inverseWorldMatrix,
          ),
          this.frustum &&
            this.frustum.setFromProjectionMatrix(this._projScreenMatrix));
      }
    }
  }
  const Ie = {};
  function He(t, e) {
    return (
      void 0 === Ie.EXT_color_buffer_float &&
        (Ie.EXT_color_buffer_float = t.getExtension("EXT_color_buffer_float")),
      void 0 === Ie.OES_texture_float_linear &&
        (Ie.OES_texture_float_linear = t.getExtension(
          "OES_texture_float_linear",
        )),
      void 0 === Ie.EXT_color_buffer_float &&
        (Ie.EXT_color_buffer_float = t.getExtension("EXT_color_buffer_float")),
      void 0 === Ie.OES_texture_half_float_linear &&
        (Ie.OES_texture_half_float_linear = t.getExtension(
          "OES_texture_half_float_linear",
        )),
      e === t.FLOAT &&
        (Ie.EXT_color_buffer_float ||
          (console.warn(
            "trying to create a FrameBuffer of with gl.FLOAT type but theres no floating point texture support. trying HALF_FLOAT...",
          ),
          (e = t.HALF_FLOAT))),
      e === t.HALF_FLOAT &&
        (Ie.EXT_color_buffer_float ||
          (console.warn(
            "trying to create a texture of with gl.HALF_FLOAT type but theres no half floating point texture support; falling bck to UNSIGNED_BYTE type",
          ),
          (e = t.UNSIGNED_BYTE))),
      e
    );
  }
  class qe {
    constructor(t, e) {
      if (
        ((this.options = Object.assign(
          {},
          {
            format: t.RGBA,
            type: t.UNSIGNED_BYTE,
            linear: !0,
            mipmap: !1,
            mipmapLinear: !1,
            wrapS: t.CLAMP_TO_EDGE,
            wrapT: t.CLAMP_TO_EDGE,
            depthTexture: null,
            skipViewport: !1,
            numRenderTargets: 1,
            renderTargets: [],
            depthOnly: !1,
          },
          e,
        )),
        (this.gl = t),
        (this.type = He(t, this.options.type)),
        (this.skipViewport = this.options.skipViewport),
        (this.width = this.options.width),
        (this.height = this.options.height),
        (this.format = this.options.format),
        (this.linear = this.options.linear),
        (this.mipmap = this.options.mipmap),
        (this.mipmapLinear = this.options.mipmapLinear),
        (this.renderTargets = []),
        this.options.numRenderTargets > 1)
      )
        for (let t = 0; t < this.options.numRenderTargets; t++)
          this.renderTargets.push({ type: this.type });
      if (this.options.renderTargets.length > 0)
        for (let e = 0; e < this.options.renderTargets.length; e++)
          this.renderTargets.push({
            type: He(t, this.options.renderTargets[e].type),
          });
      if (this.options.depthOnly)
        ((this.fbo = t.createFramebuffer()),
          (this.fbo.name = this.name),
          pt.trackFrameBuffer(this.fbo),
          t.bindFramebuffer(t.FRAMEBUFFER, this.fbo),
          (this.depthTexture = t.createTexture()),
          pt.trackTexture(this.depthTexture),
          t.bindTexture(t.TEXTURE_2D, this.depthTexture),
          t.texImage2D(
            t.TEXTURE_2D,
            0,
            t.DEPTH_COMPONENT32F,
            this.width,
            this.height,
            0,
            t.DEPTH_COMPONENT,
            t.FLOAT,
            null,
          ),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
          t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
          t.framebufferTexture2D(
            t.FRAMEBUFFER,
            t.DEPTH_ATTACHMENT,
            t.TEXTURE_2D,
            this.depthTexture,
            0,
          ));
      else {
        if (this.renderTargets.length > 0) {
          this._textures = [];
          for (let t = 0; t < this.renderTargets.length; t++) {
            const e = this.gl.createTexture();
            (pt.trackTexture(e),
              (e.bind = (t) => {
                this.gl &&
                  (void 0 !== t &&
                    this.gl.activeTexture(this.gl.TEXTURE0 + (0 | t)),
                  this.gl.bindTexture(this.gl.TEXTURE_2D, e));
              }),
              this.gl.bindTexture(this.gl.TEXTURE_2D, e),
              this.renderTargets[t].type == this.gl.FLOAT
                ? this.gl.texImage2D(
                    this.gl.TEXTURE_2D,
                    0,
                    this.gl.RGBA32F,
                    this.width,
                    this.height,
                    0,
                    this.gl.RGBA,
                    this.gl.FLOAT,
                    null,
                  )
                : this.renderTargets[t].type == this.gl.HALF_FLOAT
                  ? this.gl.texImage2D(
                      this.gl.TEXTURE_2D,
                      0,
                      this.gl.RGBA16F,
                      this.width,
                      this.height,
                      0,
                      this.gl.RGBA,
                      this.gl.HALF_FLOAT,
                      null,
                    )
                  : this.gl.texImage2D(
                      this.gl.TEXTURE_2D,
                      0,
                      this.gl.RGBA,
                      this.width,
                      this.height,
                      0,
                      this.gl.RGBA,
                      this.renderTargets[t].type,
                      new Uint8Array(new Array(this.width * this.height * 4)),
                    ),
              this._textures.push(e));
          }
        } else
          ((this._texture = this.gl.createTexture()),
            pt.trackTexture(this._texture),
            (this._texture.__is_framebuffer_texture__ = !0),
            this.gl.bindTexture(this.gl.TEXTURE_2D, this._texture),
            this.type == this.gl.FLOAT
              ? this.gl.texImage2D(
                  this.gl.TEXTURE_2D,
                  0,
                  this.gl.RGBA32F,
                  this.width,
                  this.height,
                  0,
                  this.gl.RGBA,
                  this.gl.FLOAT,
                  null,
                )
              : this.type == this.gl.HALF_FLOAT
                ? this.gl.texImage2D(
                    this.gl.TEXTURE_2D,
                    0,
                    this.gl.RGBA16F,
                    this.width,
                    this.height,
                    0,
                    this.gl.RGBA,
                    this.gl.HALF_FLOAT,
                    null,
                  )
                : this.gl.texImage2D(
                    this.gl.TEXTURE_2D,
                    0,
                    this.gl.RGBA,
                    this.width,
                    this.height,
                    0,
                    this.gl.RGBA,
                    this.type,
                    null,
                  ));
        if (
          ((this.wrapS = this.options.wrapS),
          (this.wrapT = this.options.wrapT),
          (ee(this.width) && ee(this.height)) ||
            ((this.wrapS = t.CLAMP_TO_EDGE),
            (this.wrapT = t.CLAMP_TO_EDGE),
            (this.mipmap = !1),
            (this.mipmapLinear = !1)),
          this._textures)
        )
          for (let t = 0; t < this._textures.length; t++)
            (this.gl.bindTexture(this.gl.TEXTURE_2D, this._textures[t]),
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_S,
                this.wrapS,
              ),
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_T,
                this.wrapT,
              ));
        else
          (this.gl.bindTexture(this.gl.TEXTURE_2D, this._texture),
            this.gl.texParameteri(
              this.gl.TEXTURE_2D,
              this.gl.TEXTURE_WRAP_S,
              this.wrapS,
            ),
            this.gl.texParameteri(
              this.gl.TEXTURE_2D,
              this.gl.TEXTURE_WRAP_T,
              this.wrapT,
            ));
        if (
          (this.setFilter(this.linear, this.mipmap, this.mipmapLinear),
          this.options.depthTexture ||
            ((this.renderbuffer = this.gl.createRenderbuffer()),
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.renderbuffer),
            this.gl.renderbufferStorage(
              this.gl.RENDERBUFFER,
              this.gl.DEPTH_COMPONENT32F,
              this.width,
              this.height,
            )),
          (this.fbo = this.gl.createFramebuffer()),
          pt.trackFrameBuffer(this.fbo),
          this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo),
          this._textures)
        ) {
          const t = [];
          for (let e = 0; e < this._textures.length; e++)
            (this.gl.framebufferTexture2D(
              this.gl.DRAW_FRAMEBUFFER,
              this.gl["COLOR_ATTACHMENT" + e],
              this.gl.TEXTURE_2D,
              this._textures[e],
              0,
            ),
              t.push(this.gl["COLOR_ATTACHMENT" + e]));
          this.gl.drawBuffers(t);
        } else
          this.gl.framebufferTexture2D(
            this.gl.FRAMEBUFFER,
            this.gl.COLOR_ATTACHMENT0,
            this.gl.TEXTURE_2D,
            this._texture,
            0,
          );
        this.gl.framebufferRenderbuffer(
          this.gl.FRAMEBUFFER,
          this.gl.DEPTH_ATTACHMENT,
          this.gl.RENDERBUFFER,
          this.renderbuffer,
        );
      }
      this.unbind();
    }
    setFilter(t, e, i) {
      var s = this.gl,
        r = te(!!t, !!e, !!i);
      if (this._textures)
        for (let e = 0; e < this._textures.length; e++)
          (s.bindTexture(s.TEXTURE_2D, this._textures[e]),
            s.texParameteri(
              s.TEXTURE_2D,
              s.TEXTURE_MAG_FILTER,
              te(!!t, !1, !1),
            ),
            s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, r));
      else
        (s.bindTexture(s.TEXTURE_2D, this._texture),
          s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MAG_FILTER, te(!!t, !1, !1)),
          s.texParameteri(s.TEXTURE_2D, s.TEXTURE_MIN_FILTER, r));
    }
    resize(t, e) {
      if (
        ((this.width === t && this.height === e) ||
          ((this.width = 0 | t), (this.height = 0 | e)),
        this.options.depthOnly)
      )
        (this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo),
          this.gl.bindTexture(this.gl.TEXTURE_2D, this.depthTexture),
          this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.DEPTH_COMPONENT32F,
            this.width,
            this.height,
            0,
            this.gl.DEPTH_COMPONENT,
            this.gl.FLOAT,
            null,
          ),
          this.gl.framebufferTexture2D(
            this.gl.FRAMEBUFFER,
            this.gl.DEPTH_ATTACHMENT,
            this.gl.TEXTURE_2D,
            this.depthTexture,
            0,
          ));
      else {
        if (
          ((ee(this.width) && ee(this.height)) ||
            ((this.wrapS = this.gl.CLAMP_TO_EDGE),
            (this.wrapT = this.gl.CLAMP_TO_EDGE),
            (this.mipmap = !1),
            (this.mipmapLinear = !1),
            this.setFilter(this.linear, this.mipmap, this.mipmapLinear)),
          this._textures)
        ) {
          const t = [];
          for (let e = 0; e < this._textures.length; e++)
            (this.gl.bindTexture(this.gl.TEXTURE_2D, this._textures[e]),
              this.type == this.gl.FLOAT
                ? this.gl.texImage2D(
                    this.gl.TEXTURE_2D,
                    0,
                    this.gl.RGBA32F,
                    this.width,
                    this.height,
                    0,
                    this.format,
                    this.type,
                    null,
                  )
                : this.type == this.gl.HALF_FLOAT
                  ? this.gl.texImage2D(
                      this.gl.TEXTURE_2D,
                      0,
                      this.gl.RGBA16F,
                      this.width,
                      this.height,
                      0,
                      this.gl.RGBA,
                      this.gl.HALF_FLOAT,
                      null,
                    )
                  : this.gl.texImage2D(
                      this.gl.TEXTURE_2D,
                      0,
                      this.gl.RGBA,
                      this.width,
                      this.height,
                      0,
                      this.gl.RGBA,
                      this.type,
                      null,
                    ),
              this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo),
              this.gl.framebufferTexture2D(
                this.gl.DRAW_FRAMEBUFFER,
                this.gl["COLOR_ATTACHMENT" + e],
                this.gl.TEXTURE_2D,
                this._textures[e],
                0,
              ),
              t.push(this.gl["COLOR_ATTACHMENT" + e]));
          this.gl.drawBuffers(t);
        } else
          (this.gl.bindTexture(this.gl.TEXTURE_2D, this._texture),
            this.type == this.gl.FLOAT
              ? this.gl.texImage2D(
                  this.gl.TEXTURE_2D,
                  0,
                  this.gl.RGBA32F,
                  this.width,
                  this.height,
                  0,
                  this.format,
                  this.type,
                  null,
                )
              : this.type == this.gl.HALF_FLOAT
                ? this.gl.texImage2D(
                    this.gl.TEXTURE_2D,
                    0,
                    this.gl.RGBA16F,
                    this.width,
                    this.height,
                    0,
                    this.gl.RGBA,
                    this.gl.HALF_FLOAT,
                    null,
                  )
                : this.gl.texImage2D(
                    this.gl.TEXTURE_2D,
                    0,
                    this.gl.RGBA,
                    this.width,
                    this.height,
                    0,
                    this.gl.RGBA,
                    this.type,
                    null,
                  ),
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo),
            this.gl.framebufferTexture2D(
              this.gl.FRAMEBUFFER,
              this.gl.COLOR_ATTACHMENT0,
              this.gl.TEXTURE_2D,
              this._texture,
              0,
            ));
        (this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.renderbuffer),
          this.gl.renderbufferStorage(
            this.gl.RENDERBUFFER,
            this.gl.DEPTH_COMPONENT32F,
            this.width,
            this.height,
          ),
          this.gl.framebufferRenderbuffer(
            this.gl.FRAMEBUFFER,
            this.gl.DEPTH_ATTACHMENT,
            this.gl.RENDERBUFFER,
            this.renderbuffer,
          ));
      }
      this.unbind();
    }
    bindFrame(t) {
      t
        ? this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo)
        : (this.skipViewport || this.gl.viewport(0, 0, this.width, this.height),
          this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fbo),
          this.options.depthOnly
            ? (this.gl.bindTexture(this.gl.TEXTURE_2D, this.depthTexture),
              this.gl.framebufferTexture2D(
                this.gl.FRAMEBUFFER,
                this.gl.DEPTH_ATTACHMENT,
                this.gl.TEXTURE_2D,
                this.depthTexture,
                0,
              ),
              this.gl.drawBuffers([this.gl.NONE]),
              this.gl.readBuffer(this.gl.NONE))
            : (this.options.depthTexture
                ? (this.gl.bindRenderbuffer(
                    this.gl.RENDERBUFFER,
                    this.renderbuffer,
                  ),
                  this.gl.renderbufferStorage(
                    this.gl.RENDERBUFFER,
                    this.gl.DEPTH_COMPONENT32F,
                    this.width,
                    this.height,
                  ),
                  this.gl.framebufferRenderbuffer(
                    this.gl.FRAMEBUFFER,
                    this.gl.DEPTH_ATTACHMENT,
                    this.gl.RENDERBUFFER,
                    this.renderbuffer,
                  ))
                : this.gl.bindRenderbuffer(
                    this.gl.RENDERBUFFER,
                    this.renderbuffer,
                  ),
              this.clear()));
    }
    bind(t) {
      (this.gl.activeTexture(this.gl.TEXTURE0 + (0 | t)),
        this.gl.bindTexture(
          this.gl.TEXTURE_2D,
          this.options.depthOnly ? this.depthTexture : this._texture,
        ));
    }
    unbind() {
      (this.gl.bindTexture(this.gl.TEXTURE_2D, null),
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null),
        this.options.depthTexture ||
          this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null));
    }
    clear(t, e, i) {
      var s = 0;
      ((void 0 === t || t) && (s |= this.gl.COLOR_BUFFER_BIT),
        (void 0 === e || e) && (s |= this.gl.DEPTH_BUFFER_BIT),
        (void 0 === i || i) && (s |= this.gl.STENCIL_BUFFER_BIT),
        this.gl.clear(s));
    }
    dispose() {
      (pt.untrackFrameBuffer(this.fbo),
        this.gl.deleteFramebuffer(this.fbo),
        (this.fbo = null),
        (this.gl = null));
    }
  }
  class Xe extends ne {
    constructor(t = {}) {
      if (
        (super(
          (t = Object.assign(
            {},
            {
              type: "spotlight",
              size: 1,
              color: [1, 1, 1],
              direction: [-1, -1, 0],
              position: [1, 1, 1],
              intensity: 1,
              near: 1,
              distance: 100,
              decay: 2,
              angle: Math.PI / 4,
              exponent: 1,
              castShadow: !1,
              penumbra: 0,
              shadowMap: !0,
              useShadows: !0,
              shadowMapResolution: 256,
              width: 0,
              height: 0,
              left: 1e3,
              right: 1e3,
              top: 1e3,
              bottom: 1e3,
              shadowCamera: null,
              temperature: -1,
              useTemperature: !1,
              maxCameraAngle: (0.9 * Math.PI) / 2,
              shadowMode: "linear",
            },
            t,
          )),
        ),
        (this.__is_light__ = !0),
        (this.shadowMode = t.shadowMode),
        (this.useShadows = t.useShadows),
        (this.static = !0),
        (this.maxCameraAngle = t.maxCameraAngle),
        (this.type = t.type),
        (this.size = 1),
        (this.color = t.color),
        (this.intensity = t.intensity),
        (this.position = t.position),
        (this.distance = t.distance),
        (this.decay = t.decay),
        (this.angle = t.angle),
        (this.exponent = t.exponent),
        (this.penumbra = t.penumbra),
        (this.castShadow = t.castShadow),
        (this.left = t.left),
        (this.right = t.right),
        (this.top = t.top),
        (this.bottom = t.bottom),
        (this.near = t.near),
        (this.width = t.width),
        (this.height = t.height),
        (this.useTemperature = t.useTemperature),
        (this.temperature = t.temperature),
        t.lookAt && (this.lookAt = t.lookAt),
        t.shadowMap || this.castShadow)
      ) {
        ((this.shadowMapResolution = t.shadowMapResolution),
          (this.shadowMap = !0));
        const e = {
          near: t?.shadowCamera?.near || this.near,
          far: t?.shadowCamera?.far || this.distance,
          type:
            t?.shadowCamera?.type ||
            ("directionallight" == this.type ? "orthographic" : "perspective"),
          orbitControl: !1,
          firstPerson: !1,
        };
        ("perspective" === e.type &&
          ((e.fov =
            (2 * Math.min(this.maxCameraAngle, this.angle) * 180) / Math.PI),
          (e.aspect = 1),
          (e.frustum = !0)),
          "orthographic" === e.type &&
            ((e.left = t?.shadowCamera?.left || this.left),
            (e.right = t?.shadowCamera?.right || this.right),
            (e.top = t?.shadowCamera?.top || this.top),
            (e.bottom = t?.shadowCamera?.bottom || this.bottom),
            (e.frustum = !1)),
          (this.shadowMapCamera = new Be(e)),
          this.lookAt &&
            ((this.shadowMapCamera.lookAt = Ct()),
            kt(this.shadowMapCamera.lookAt, this.lookAt)));
      }
    }
    update() {
      (this.render(),
        this.shadowMap &&
          ((this.shadowMapCamera.fov =
            (2 * Math.min(this.maxCameraAngle, this.angle) * 180) / Math.PI),
          this.shadowMapCamera.updateProjectionMatrix(),
          (this.shadowMapCamera.position[0] = this.worldMatrix[12]),
          (this.shadowMapCamera.position[1] = this.worldMatrix[13]),
          (this.shadowMapCamera.position[2] = this.worldMatrix[14]),
          (this.shadowMapCamera.rotation[0] = this.rotation[0]),
          (this.shadowMapCamera.rotation[1] = this.rotation[1]),
          (this.shadowMapCamera.rotation[2] = this.rotation[2]),
          this.lookAt &&
            Dt(
              this.shadowMapCamera.lookAt,
              this.lookAt[0],
              this.lookAt[1],
              this.lookAt[2],
            ),
          this.shadowMapCamera.update(),
          this.shadowMapCamera.updateMatrix(),
          this.shadowMapCamera.updateWorldMatrix(),
          (this.hasUpdatedOnce = !0)));
    }
  }
  class We extends Xe {
    constructor(t = {}) {
      ((t.type = "ambientlight"),
        super(
          (t = Object.assign(
            {},
            {
              color: [1, 1, 1],
              intensity: 1,
              temperature: -1,
              useTemperature: !1,
            },
            t,
          )),
        ),
        (this.__is_light__ = !0),
        (this.type = t.type),
        (this.color = t.color),
        (this.intensity = t.intensity),
        (this.useTemperature = t.useTemperature),
        (this.temperature = t.temperature));
    }
  }
  class ze extends Xe {
    constructor(t = {}) {
      ((t.type = "rectlight"), super(t));
    }
  }
  class Ye extends Xe {
    constructor(t = {}) {
      ((t.type = "spotlight"), super(t));
    }
  }
  class Ve extends Xe {
    constructor(t = {}) {
      ((t.type = "directionallight"), super(t));
    }
  }
  class Ge extends Xe {
    constructor(t = {}) {
      ((t.type = "pointlight"), super(t));
    }
  }
  const je = {
      spotlight: 0,
      rectlight: 1,
      directionallight: 2,
      pointlight: 3,
      ambientlight: 4,
    },
    Ze = { sharp: 0, linear: 1, pcf: 2, pcss: 3 };
  class Ke extends ae {
    constructor(t = {}) {
      (super(),
        (this.defines = {}),
        (this.lights = []),
        (this.ambientLights = []),
        (this.reflectors = []),
        (this.overrideMaterial = null),
        (this.overrides = {}),
        (this.uniforms = {}),
        (this.inverseViewProjectionMatrix = _t()),
        (this.lightInvVPMatrix = _t()),
        (this.viewProjectionwMatrix = _t()),
        (this.cameraDirection = Ct()),
        (this.cameraPosition = Ct()),
        (this.lastViewProjectionMatrix = _t()),
        (this.lastInvViewProjectionMatrix = _t()),
        (this.autoUpdateCameraUniforms =
          !!t.autoUpdateCameraUniforms && t.autoUpdateCameraUniforms));
    }
    add(t) {
      t instanceof Xe ? (this.lights.push(t), super.add(t)) : super.add(t);
    }
    updateLights() {
      if (
        ((this.ambientLights = this.lights.filter((t) => t instanceof We)),
        (this.rectLights = this.lights.filter((t) => t instanceof ze)),
        (this.spotLights = this.lights.filter((t) => t instanceof Ye)),
        (this.directionalLights = this.lights.filter((t) => t instanceof Ve)),
        (this.pointLights = this.lights.filter((t) => t instanceof Ge)),
        (this.shadowMaps = []),
        this?.rectLights)
      ) {
        let e = [],
          i = [],
          s = [],
          r = [],
          n = [],
          o = [],
          a = [],
          h = [],
          l = [],
          d = [],
          c = [],
          u = [],
          p = [],
          f = [],
          m = [],
          g = [],
          b = [],
          v = [],
          w = [],
          y = [];
        for (var t = 0; t < this.rectLights.length; t++) {
          const _ = this.rectLights[t];
          ((_.static = !1), _.update());
          let E = Ct();
          (Dt(E, 0, 0, -1),
            It(E, E, _._normalMatrix),
            $t(E, E),
            u.push(E[0], E[1], E[2]),
            r.push.apply(r, _.shadowMapCamera.inverseWorldMatrix),
            s.push.apply(s, _.shadowMapCamera.projectionMatrix));
          let x = _t();
          (Tt(
            x,
            _.shadowMapCamera.projectionMatrix,
            _.shadowMapCamera.inverseWorldMatrix,
          ),
            n.push.apply(n, x),
            Et(this.lightInvVPMatrix, _.shadowMapCamera.projectionMatrix),
            Tt(
              this.lightInvVPMatrix,
              this.lightInvVPMatrix,
              _.shadowMapCamera.inverseWorldMatrix,
            ),
            Mt(this.lightInvVPMatrix, this.lightInvVPMatrix),
            e.push.apply(e, this.lightInvVPMatrix),
            b.push(_.shadowMapResolution),
            p.push.apply(p, _._normalMatrix),
            h.push(_.worldMatrix[12], _.worldMatrix[13], _.worldMatrix[14]),
            l.push(Math.cos(_.angle)),
            d.push(_.temperature),
            c.push(_.useTemperature ? 1 : 0),
            o.push.apply(o, [
              _.color[0] * _.intensity,
              _.color[1] * _.intensity,
              _.color[2] * _.intensity,
            ]),
            a.push(_.distance),
            f.push(je[_.type.toLowerCase()]),
            v.push(
              _.shadowMapCamera
                ? "perspective" == _.shadowMapCamera.type
                  ? 1
                  : 0
                : -1,
            ),
            w.push(Ze[_.shadowMode]),
            y.push.apply(y, [_.width, _.height]));
          let M = Ct(),
            T = Ct();
          (Dt(M, 0.5 * _.width, 0, 0), Dt(T, 0, 0.5 * _.height, 0));
          let A = _t(),
            S = se();
          (Et(A, _.worldMatrix),
            St(S, A),
            Ht(M, M, S),
            Ht(T, T, S),
            g.push.apply(g, M),
            m.push.apply(m, T),
            i.push(_.castShadow ? 1 : 0));
        }
        this.rectLights.length > 0
          ? ((this.uniforms.rectLightType = f),
            (this.uniforms.rectLightColor = o),
            (this.uniforms.rectLightDistance = a),
            (this.uniforms.rectLightPosition = h),
            (this.uniforms.rectLightDirection = u),
            (this.uniforms.rectLightAngleCos = l),
            (this.uniforms.rectLightRotation = p),
            (this.uniforms.rectLightPMMatrix = n),
            (this.uniforms.rectLightMMatrix = r),
            (this.uniforms.rectLightCastShadow = i),
            (this.uniforms.rectLightTemperture = d),
            (this.uniforms.rectLightUseTemperture = c),
            (this.uniforms.rectLightHalfWidth = g),
            (this.uniforms.rectLightHalfHeight = m),
            (this.uniforms.rectLightShadowCameraType = v),
            (this.uniforms.rectLightShadowMode = w),
            (this.uniforms.rectLightSize = y),
            (this.defines.NUM_RECT_LIGHTS = this.rectLights.length))
          : delete this.defines.NUM_RECT_LIGHTS;
      }
      if (this.spotLights) {
        const e = [],
          i = [],
          s = [],
          r = [],
          n = [],
          o = [],
          a = [],
          h = [],
          l = [],
          d = [],
          c = [],
          u = [],
          p = [],
          f = [],
          m = [],
          g = [],
          b = [],
          v = [],
          w = [];
        for (t = 0; t < this.spotLights.length; t++) {
          const y = this.spotLights[t];
          ((y.static = !1), y.update());
          let _ = Ct();
          (Dt(_, 0, 0, -1),
            It(_, _, y._normalMatrix),
            $t(_, _),
            u.push(_[0], _[1], _[2]),
            r.push.apply(r, y.shadowMapCamera.inverseWorldMatrix),
            s.push.apply(s, y.shadowMapCamera.projectionMatrix));
          let E = _t();
          (Tt(
            E,
            y.shadowMapCamera.projectionMatrix,
            y.shadowMapCamera.inverseWorldMatrix,
          ),
            n.push.apply(n, E),
            Et(this.lightInvVPMatrix, y.shadowMapCamera.projectionMatrix),
            Tt(
              this.lightInvVPMatrix,
              this.lightInvVPMatrix,
              y.shadowMapCamera.inverseWorldMatrix,
            ),
            Mt(this.lightInvVPMatrix, this.lightInvVPMatrix),
            e.push.apply(e, this.lightInvVPMatrix),
            m.push(y.shadowMapResolution),
            p.push.apply(p, y._normalMatrix),
            h.push(y.worldMatrix[12], y.worldMatrix[13], y.worldMatrix[14]),
            l.push(Math.cos(y.angle)),
            d.push(y.temperature),
            c.push(y.useTemperature ? 1 : 0),
            o.push.apply(o, [
              y.color[0] * y.intensity,
              y.color[1] * y.intensity,
              y.color[2] * y.intensity,
            ]),
            a.push(y.distance),
            f.push(je[y.type.toLowerCase()]),
            g.push(
              y.shadowMapCamera
                ? "perspective" == y.shadowMapCamera.type
                  ? 1
                  : 0
                : -1,
            ),
            b.push(Ze[y.shadowMode]),
            v.push.apply(v, [y.width, y.height]),
            i.push(y.castShadow ? 1 : 0),
            w.push(y.decay));
        }
        this.spotLights.length > 0
          ? ((this.uniforms.spotLightType = f),
            (this.uniforms.spotLightColor = o),
            (this.uniforms.spotLightDistance = a),
            (this.uniforms.spotLightPosition = h),
            (this.uniforms.spotLightDirection = u),
            (this.uniforms.spotLightAngleCos = l),
            (this.uniforms.spotLigthRotation = p),
            (this.uniforms.spotLightPMMatrix = n),
            (this.uniforms.spotLightMMatrix = r),
            (this.uniforms.spotLightTemperture = d),
            (this.uniforms.spotLightUseTemperture = c),
            (this.uniforms.spotLightShadowCameraType = g),
            (this.uniforms.spotLightShadowMode = b),
            (this.uniforms.spotLightSize = v),
            (this.uniforms.spotLightCastShadow = i),
            (this.uniforms.spotLightDecay = w),
            (this.defines.NUM_SPOT_LIGHTS = this.spotLights.length))
          : delete this.defines.NUM_SPOT_LIGHTS;
      }
      if (this.pointLights) {
        const e = [],
          i = [],
          s = [],
          r = [],
          n = [],
          o = [],
          a = [],
          h = [];
        for (t = 0; t < this.pointLights.length; t++) {
          const l = this.pointLights[t];
          ((l.static = !1),
            l.update(),
            s.push(l.worldMatrix[12], l.worldMatrix[13], l.worldMatrix[14]),
            r.push(l.temperature),
            n.push(l.useTemperature ? 1 : 0),
            e.push.apply(e, [
              l.color[0] * l.intensity,
              l.color[1] * l.intensity,
              l.color[2] * l.intensity,
            ]),
            i.push(l.distance),
            o.push(je[l.type.toLowerCase()]),
            a.push.apply(a, [l.width, l.height]),
            h.push(l.decay));
        }
        this.pointLights.length > 0
          ? ((this.uniforms.pointLightType = o),
            (this.uniforms.pointLightColor = e),
            (this.uniforms.pointLightDistance = i),
            (this.uniforms.pointLightPosition = s),
            (this.uniforms.pointLightTemperture = r),
            (this.uniforms.pointLightUseTemperture = n),
            (this.uniforms.pointLightDecay = h),
            (this.defines.NUM_POINT_LIGHTS = this.pointLights.length))
          : delete this.defines.NUM_POINT_LIGHTS;
      }
      if (this.directionalLights) {
        const e = [],
          i = [],
          s = [],
          r = [],
          n = [],
          o = [],
          a = [],
          h = [],
          l = [],
          d = [],
          c = [],
          u = [],
          p = [],
          f = [],
          m = [],
          g = [],
          b = [],
          v = [];
        for (t = 0; t < this.directionalLights.length; t++) {
          const w = this.directionalLights[t];
          ((w.static = !1), w.update());
          let y = Ct();
          (Dt(y, 0, 0, -1),
            It(y, y, w._normalMatrix),
            $t(y, y),
            u.push(y[0], y[1], y[2]),
            r.push.apply(r, w.shadowMapCamera.inverseWorldMatrix),
            s.push.apply(s, w.shadowMapCamera.projectionMatrix));
          let _ = _t();
          (Tt(
            _,
            w.shadowMapCamera.projectionMatrix,
            w.shadowMapCamera.inverseWorldMatrix,
          ),
            n.push.apply(n, _),
            Et(this.lightInvVPMatrix, w.shadowMapCamera.projectionMatrix),
            Tt(
              this.lightInvVPMatrix,
              this.lightInvVPMatrix,
              w.shadowMapCamera.inverseWorldMatrix,
            ),
            Mt(this.lightInvVPMatrix, this.lightInvVPMatrix),
            e.push.apply(e, this.lightInvVPMatrix),
            m.push(w.shadowMapResolution),
            p.push.apply(p, w._normalMatrix),
            h.push(w.worldMatrix[12], w.worldMatrix[13], w.worldMatrix[14]),
            l.push(Math.cos(w.angle)),
            d.push(w.temperature),
            c.push(w.useTemperature ? 1 : 0),
            o.push.apply(o, [
              w.color[0] * w.intensity,
              w.color[1] * w.intensity,
              w.color[2] * w.intensity,
            ]),
            a.push(w.distance),
            f.push(je[w.type.toLowerCase()]),
            g.push(
              w.shadowMapCamera
                ? "perspective" == w.shadowMapCamera.type
                  ? 1
                  : 0
                : -1,
            ),
            b.push(Ze[w.shadowMode]),
            v.push.apply(v, [w.width, w.height]),
            i.push(w.castShadow ? 1 : 0));
        }
        this.directionalLights.length > 0
          ? ((this.uniforms.directionalLightType = f),
            (this.uniforms.directionalLightColor = o),
            (this.uniforms.directionalLightDistance = a),
            (this.uniforms.directionalLightPosition = h),
            (this.uniforms.directionalLightDirection = u),
            (this.uniforms.directionalLightAngleCos = l),
            (this.uniforms.directionalLigthRotation = p),
            (this.uniforms.directionalLightPMMatrix = n),
            (this.uniforms.directionalLightMMatrix = r),
            (this.uniforms.directionalLightCastShadow = i),
            (this.uniforms.directionalLightTemperture = d),
            (this.uniforms.directionalLightUseTemperture = c),
            (this.uniforms.directionalLightShadowCameraType = g),
            (this.uniforms.directionalLightShadowMode = b),
            (this.uniforms.directionalLightSize = v),
            (this.defines.NUM_DIRECTIONAL_LIGHTS =
              this.directionalLights.length))
          : delete this.defines.NUM_DIRECTIONAL_LIGHTS;
      }
      const e = [];
      if (this?.ambientLights)
        for (t = 0; t < this.ambientLights.length; t++) {
          const i = this.ambientLights[t];
          e.push(...i.color.map((t) => t * i.intensity));
        }
      this.ambientLights.length > 0
        ? ((this.defines.NUM_AMBIENT_LIGHTS = this.ambientLights.length),
          (this.uniforms.ambientLightColor = e))
        : delete this.defines.NUM_AMBIENT_LIGHTS;
    }
    updateCameraUniforms(t) {
      (Dt(
        this.cameraPosition,
        t.worldMatrix[12],
        t.worldMatrix[13],
        t.worldMatrix[14],
      ),
        t.lookAt
          ? (kt(this.cameraDirection, t.lookAt),
            Ut(this.cameraDirection, this.cameraDirection, this.cameraPosition),
            $t(this.cameraDirection, this.cameraDirection))
          : t.forwardVector && kt(this.cameraDirection, t.forwardVector),
        Et(this.viewProjectionwMatrix, t.projectionMatrix),
        Tt(
          this.viewProjectionwMatrix,
          this.viewProjectionwMatrix,
          t.inverseWorldMatrix,
        ),
        Mt(this.inverseViewProjectionMatrix, this.viewProjectionwMatrix),
        (this.uniforms.uInverseViewProjectionMatrix =
          this.inverseViewProjectionMatrix),
        (this.uniforms.uProjViewMatrix = this.viewProjectionwMatrix),
        (this.uniforms.uCameraPosition = this.cameraPosition),
        (this.uniforms.uEyePosition = this.cameraPosition),
        (this.uniforms.uEyeDirection = this.cameraDirection),
        (this.uniforms.uInverseViewMatrix =
          this.uniforms.uInverseViewMatrix || _t()),
        (this.uniforms.uViewMatrix = t.inverseWorldMatrix),
        (this.uniforms.uProjectionMatrix = t.projectionMatrix),
        (this.uniforms.uInverseProjectionMatrix =
          this.uniforms.uInverseProjectionMatrix || _t()),
        Et(this.uniforms.uInverseViewMatrix, t.inverseWorldMatrix),
        Mt(this.uniforms.uInverseViewMatrix, this.uniforms.uInverseViewMatrix),
        Mt(this.uniforms.uInverseProjectionMatrix, t.projectionMatrix),
        (this.uniforms.uCameraNear = t.near),
        (this.uniforms.uCameraFar = t.far));
    }
    setCamera(t) {
      this.camera = t;
    }
    render(t) {
      (this.updateLights(),
        this.autoUpdateCameraUniforms && t && this.updateCameraUniforms(t),
        super.render(t, this));
    }
  }
  class Qe extends Xt {
    constructor(t, e) {
      (super(t, 4),
        (e = Object.assign(
          {},
          {
            width: 1,
            height: 1,
            depth: 1,
            widthSegments: 1,
            heightSegments: 1,
            depthSegments: 1,
            skipDiagonals: !1,
          },
          e,
        )));
      var i = [],
        s = [],
        r = [],
        n = [],
        o = [],
        a = 0,
        h = 0;
      function l(t, l, d, c, u, p, f, m, g, b) {
        h = 0;
        var v,
          w,
          y = p / g,
          _ = f / b,
          E = p / 2,
          x = f / 2,
          M = m / 2,
          T = g + 1,
          A = b + 1,
          S = Ct();
        for (w = 0; w < A; w++) {
          var P = w * _ - x;
          for (v = 0; v < T; v++) {
            var C = v * y - E;
            ((S[t] = C * c),
              (S[l] = P * u),
              (S[d] = M),
              s.push(S[0], S[1], S[2]),
              (S[t] = 0),
              (S[l] = 0),
              (S[d] = m > 0 ? 1 : -1),
              r.push(S[0], S[1], S[2]),
              n.push(v / g, 1 - w / b),
              o.push(1, 1, 1),
              h++);
          }
        }
        for (w = 0; w < b; w++)
          for (v = 0; v < g; v++) {
            var L = a + v + T * w,
              R = a + v + T * (w + 1),
              k = a + (v + 1) + T * (w + 1),
              D = a + (v + 1) + T * w;
            e.skipDiagonals
              ? (i.push(L, R), i.push(R, k), i.push(k, D), i.push(D, L))
              : (i.push(L, R, D), i.push(R, k, D));
          }
        a += h;
      }
      (l(
        2,
        1,
        0,
        -1,
        -1,
        e.depth,
        e.height,
        e.width,
        Math.floor(e.depthSegments),
        Math.floor(e.heightSegments),
      ),
        l(
          2,
          1,
          0,
          1,
          -1,
          e.depth,
          e.height,
          -e.width,
          Math.floor(e.depthSegments),
          Math.floor(e.heightSegments),
        ),
        l(
          0,
          2,
          1,
          1,
          1,
          e.width,
          e.depth,
          e.height,
          Math.floor(e.widthSegments),
          Math.floor(e.depthSegments),
        ),
        l(
          0,
          2,
          1,
          1,
          -1,
          e.width,
          e.depth,
          -e.height,
          Math.floor(e.widthSegments),
          Math.floor(e.depthSegments),
        ),
        l(
          0,
          1,
          2,
          1,
          -1,
          e.width,
          e.height,
          e.depth,
          Math.floor(e.widthSegments),
          Math.floor(e.heightSegments),
        ),
        l(
          0,
          1,
          2,
          -1,
          -1,
          e.width,
          e.height,
          -e.depth,
          Math.floor(e.widthSegments),
          Math.floor(e.heightSegments),
        ),
        (this.length = a),
        this.addAttribute("index", new Uint16Array(i), 1),
        this.addAttribute("position", new Float32Array(s), 3),
        this.addAttribute("normal", new Float32Array(r), 3),
        this.addAttribute("uv", new Float32Array(n), 2),
        this.addAttribute("color", new Float32Array(o), 3),
        (this.indices = i),
        (this.vertices = s),
        (this.normals = r),
        (this.uvs = n),
        (this.colors = o),
        this.computeBoudingBox());
    }
  }
  void 0;
  function Ls(t) {
    var e;
    return (
      3 == (e = t.substring(1).split("")).length &&
        (e = [e[0], e[0], e[1], e[1], e[2], e[2]]),
      [
        (((e = "0x" + e.join("")) >> 16) & 255) / 255,
        ((e >> 8) & 255) / 255,
        (255 & e) / 255,
      ]
    );
  }
  const Rs =
      "\n    #version 300 es\n    precision highp float;\n    in vec3 position;\n    in vec2 uv;\n    uniform mat4 uMVMatrix;\n    uniform mat4 uPMatrix;\n    out vec2 vUv;\n    void main(void) {\n        vUv = uv;\n        gl_Position = uPMatrix * uMVMatrix * vec4( position, 1.0 );\n    }\n",
    SETTINGS = {
      resolutionScale: 0.5,
      useImageBitmap: false,
      blueNoiseResolution: [256, 256],
      motion: {
        pointerLerp: 0.1,
        waveLerp: 0.003,
        shatterLerp: 0.005,
        rayLerp: 0.005,
        shatterRange: 0,
      },
      background: {
        color: "#fff9b2",
        color2: "#ffcc00",
        gradientPos: [0.08, 0.12],
        gradientPower: 0.5,
      },
      vignette: {
        color: "#ffd900",
        radius: 0.55,
        falloff: 1,
        displace: 0,
        mix: 3,
        angle: 0,
        skew: 0.54,
      },
      sine: {
        frequency: 0.35,
        amplitude: 1.18,
        falloff: 0.5,
        rotation: 0,
        phase: 0,
        speed: 0.7,
        mixRadius: 1,
        trackMouse: 1,
      },
      shatter: {
        scale: 1.1,
        amount: 1.3,
        angle: -45,
        radius: 1,
        skew: 1.0,
        mixRadius: 1,
        easing: 1,
      },
      bokeh: { mixRadius: 1, radius: 0.3, tilt: 0.9 },
      output: {
        color: "#ffffff",
        color2: "#fffac2",
        gradientPos: [0.3, 0.7],
        gradientPower: 1.6,
      },
    };
  customElements.define(
    "block-gl",
    class extends p {
      swapBuffers() {
        const tmp = this.bufferRead;
        this.bufferRead = this.bufferWrite;
        this.bufferWrite = tmp;
      }

      created() {
        this.last = performance.now();
        this.frameIndex = 0;
        this.viewport = ke.create();
        this.elapsed = 0;
        this.pointer = [0, 0];
        this.resolution = [
          window.innerWidth * SETTINGS.resolutionScale,
          window.innerHeight * SETTINGS.resolutionScale,
        ];
        this.uniforms = {};
        this.defines = {};
        this.siteSettingsMotionChange =
          this.siteSettingsMotionChange.bind(this);
        this.currVignetteColor = [0, 0, 0];
        this.currBackgroundColor = [0, 0, 0];
        this.currBackgroundColor2 = [0, 0, 0];
        this.currOutputColor = [0, 0, 0];
        this.currOutputColor2 = [0, 0, 0];
        this.currShatterAngle = SETTINGS.shatter.angle / 360;
        this.currRayRotation = 0;
        this.currSinePointer = ke.fromValues(0.5, 0.5);
      }

      resize() {
        const width = window.innerWidth * SETTINGS.resolutionScale;
        const height = window.innerHeight * SETTINGS.resolutionScale;

        if (!this.$canvas) return;

        this.renderer?.setPixelRatio(1);
        this.renderer?.resize(width, height);
        this.resolution = [width, height];
        this.bufferRead?.resize(width, height);
        this.bufferWrite?.resize(width, height);
        this.backgroundBuffer?.resize(width, height);
        this.updateViewport();
      }

      siteSettingsMotionChange(event) {
        this.stopped = event.detail === "off";
      }

      detached() {
        document.removeEventListener(
          "site_settings_motion",
          this.siteSettingsMotionChange,
        );
      }

      setColors(colors) {
        if (colors.vignetteColor) this.vignetteColor = Ls(colors.vignetteColor);
        if (colors.backgroundColor)
          this.backgroundColor = Ls(colors.backgroundColor);
        if (colors.backgroundColor2)
          this.backgroundColor2 = Ls(colors.backgroundColor2);
        if (colors.outputColor) this.outputColor = Ls(colors.outputColor);
        if (colors.outputColor2) this.outputColor2 = Ls(colors.outputColor2);
      }

      attached() {
        if (this.hasAttribute("force-center")) this.forceCenter = true;

        this.vignetteColor = Ls(
          this.getAttribute("data-vignette-color") || SETTINGS.vignette.color,
        );
        this.backgroundColor = Ls(
          this.getAttribute("data-background-color") ||
            SETTINGS.background.color,
        );
        this.backgroundColor2 = Ls(
          this.getAttribute("data-background-color-2") ||
            SETTINGS.background.color2,
        );
        this.outputColor = Ls(
          this.getAttribute("data-output-color") || SETTINGS.output.color,
        );
        this.outputColor2 = Ls(
          this.getAttribute("data-output-color-2") || SETTINGS.output.color2,
        );

        this.currVignetteColor = this.vignetteColor;
        this.currBackgroundColor = this.backgroundColor;
        this.currBackgroundColor2 = this.backgroundColor2;
        this.currOutputColor = this.outputColor;
        this.currOutputColor2 = this.outputColor2;

        this.pointer = ke.fromValues(0.5, 0.5);
        this.currPointer = ke.fromValues(0.5, 0.5);

        document.addEventListener(
          "site_settings_motion",
          this.siteSettingsMotionChange,
          false,
        );
        this.initWebgl();
        this.resize();
      }

      initWebgl() {
        this.$canvas = this.querySelector("canvas");
        this.$canvas.style.transform = "translateZ(0)";
        this.renderer = new de({ canvas: this.$canvas });

        const updatePointer = (event) => {
          const rect = this.renderer.canvas.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const src = event.touches?.[0] || event.changedTouches?.[0] || event;
          const x = (src.clientX - rect.left) / rect.width;
          const y = 1 - (src.clientY - rect.top) / rect.height;
          ke.set(this.pointer, x, y);
        };
        window.addEventListener("pointermove", updatePointer, {
          passive: true,
        });
        window.addEventListener("mousemove", updatePointer, {
          passive: true,
        });
        window.addEventListener("touchmove", updatePointer, {
          passive: true,
        });

        this.uniforms = {};
        this.defines = {};

        this.bufferScene = new Ke();
        this.bufferScene.uniforms = Object.assign(
          this.uniforms,
          this.bufferScene.uniforms,
        );
        this.bufferScene.defines = Object.assign(
          this.defines,
          this.bufferScene.defines,
        );

        this.bufferCamera = new Be({
          left: -0.5,
          right: 0.5,
          top: 0.5,
          bottom: -0.5,
          near: 1,
          far: 4000,
          type: "ortho",
          orbitControl: false,
          lookAt: [0, 0, 100],
          position: [0, 0, -100],
        });
        this.bufferCamera.updateMatrix();
        this.bufferCamera.updateWorldMatrix();
        this.bufferCamera.updateProjectionMatrix();

        this.bufferPlane = new le();
        this.bufferPlane.geometry = new Qe(this.renderer.gl, {
          width: 1,
          height: 1,
          depth: 1,
        });
        this.bufferScene.add(this.bufferPlane);

        this.outputMaterial = new Jt(this.renderer.gl, {
          vertexShader: Rs,
          depthTest: false,
          blend: true,
          fragmentShader:
            "\n" +
            "                #version 300 es\n" +
            "                precision highp float;\n" +
            "                in vec2 vUv;\n" +
            "                out vec4 fragColor;\n" +
            "                uniform sampler2D tBgTexture;\n" +
            "                uniform vec3 uBgColor;\n" +
            "                uniform sampler2D tInput;\n" +
            "                uniform vec3 uOutputColor;\n" +
            "                uniform vec3 uOutputColor2;\n" +
            "                uniform vec2 uOutputGradientPos;\n" +
            "                uniform float uOutputGradientPower;\n" +
            "                uniform vec3 uVignetteColor;\n" +
            "                uniform int uLoaded;\n" +
            "                vec3 overlay(vec3 base, vec3 blend) {\n" +
            "                    return mix(\n" +
            "                        2.0 * base * blend,\n" +
            "                        1.0 - 2.0 * (1.0 - base) * (1.0 - blend),\n" +
            "                        step(0.5, base)\n" +
            "                    );\n" +
            "                }\n" +
            "                void main() {\n" +
            "                    if (uLoaded != 1) {\n" +
            "                        fragColor = vec4(197./255., 136./255., 122./255., 1.);\n" +
            "                    }\n" +
            "                    else {\n" +
            "                        vec3 bgTex = uLoaded == 1 ? texture(tBgTexture, vUv).rgb : vec3(1.);\n" +
            "                        vec3 base = mix(\n" +
            "                            uBgColor,\n" +
            "                            overlay(uBgColor, bgTex),\n" +
            "                            0.61\n" +
            "                        );\n" +
            "                        float outDist = distance(vUv, uOutputGradientPos);\n" +
            "                        float outT = pow(clamp(1.0 - outDist, 0.0, 1.0), uOutputGradientPower);\n" +
            "                        vec3 clearColor = mix(uOutputColor, uOutputColor2, outT);\n" +
            "                        vec3 blend = mix(clearColor, texture(tInput, vUv).rgb, texture(tInput, vUv).a);\n" +
            "                        vec3 mixedColor = base * blend;\n" +
            "                        fragColor.rgb = mix(base, mixedColor, 0.6);\n" +
            "                        fragColor.a = 1.;\n" +
            "                        fragColor.rgb = base * mix(vec3(1.), blend, 0.9) + blend * 0.0001;\n" +
            "                    }\n" +
            "                }\n" +
            "            ",
        });

        this.backgroundMaterial = new Jt(this.renderer.gl, {
          vertexShader: Rs,
          depthTest: false,
          blend: true,
          fragmentShader:
            "\n" +
            "                #version 300 es\n" +
            "                precision highp float;\n" +
            "                in vec2 vUv;\n" +
            "                out vec4 fragColor;\n" +
            "                uniform vec3 uBgColor;\n" +
            "                uniform vec3 uBgColor2;\n" +
            "                uniform vec2 uBgGradientPos;\n" +
            "                uniform float uBgGradientPower;\n" +
            "                void main() {\n" +
            "                    float d = distance(vUv, uBgGradientPos);\n" +
            "                    float t = pow(clamp(1.0 - d, 0.0, 1.0), uBgGradientPower);\n" +
            "                    fragColor.rgb = mix(uBgColor, uBgColor2, t);\n" +
            "                    fragColor.a = 1.;\n" +
            "                }\n" +
            "            ",
        });

        this.vignetteMaterial = new Jt(this.renderer.gl, {
          vertexShader: Rs,
          blend: true,
          fragmentShader:
            "\n" +
            "                #version 300 es\n" +
            "                precision highp float;\n" +
            "                #define TWO_PI 6.28318530718\n" +
            "                in vec2 vUv;\n" +
            "                out vec4 fragColor;\n" +
            "                uniform float uRadius;\n" +
            "                uniform float uFalloff;\n" +
            "                uniform float uMix;\n" +
            "                uniform float uDisplace;\n" +
            "                uniform float uSkew;\n" +
            "                uniform float uAngle;\n" +
            "                uniform vec3 uVignetteColor;\n" +
            "                uniform float uColorAlpha;\n" +
            "                uniform vec2 uPos;\n" +
            "                uniform sampler2D tInput;\n" +
            "                uniform vec2 uResolution;\n" +
            "                uniform sampler2D tBgTexture;\n" +
            "                uniform vec3 uClearColor;\n" +
            "                mat2 rot(float a) {\n" +
            "                    return mat2(cos(a),-sin(a),sin(a),cos(a));\n" +
            "                }\n" +
            "                void main() {\n" +
            "                    vec2 uv = vUv;\n" +
            "                    vec4 color = vec4(vec3(1.), 0.);\n" +
            "                    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));\n" +
            "                    float displacement = (luma - 0.5) * uDisplace * 0.5;\n" +
            "                    vec2 aspectRatio = vec2(uResolution.x/uResolution.y, 1.0);\n" +
            "                    vec2 skew = vec2(uSkew, 1.0 - uSkew);\n" +
            "                    float halfRadius = uRadius * 0.5;\n" +
            "                    float innerEdge = halfRadius - uFalloff * halfRadius * 0.5;\n" +
            "                    float outerEdge = halfRadius + uFalloff * halfRadius * 0.5;\n" +
            "                    vec2 pos = uPos;\n" +
            "                    vec2 scaledUV = uv * aspectRatio * rot(uAngle * TWO_PI) * skew;\n" +
            "                    vec2 scaledPos = pos * aspectRatio * rot(uAngle * TWO_PI) * skew;\n" +
            "                    float radius = distance(scaledUV, scaledPos);\n" +
            "                    float falloff = smoothstep(innerEdge + displacement, outerEdge + displacement, radius);\n" +
            "                    fragColor = mix(vec4(uClearColor, 0.), vec4(uVignetteColor, 1.), falloff);\n" +
            "                }\n" +
            "            ",
          depthTest: false,
        });

        this.sineMaterial = new Jt(this.renderer.gl, {
          depthTest: false,
          blend: true,
          vertexShader: Rs,
          fragmentShader:
            "\n" +
            "                #version 300 es\n" +
            "                precision mediump float;\n" +
            "                #define PI 3.141592\n" +
            "                #define PI3 1.04709283144\n" +
            "                in vec2 vUv;\n" +
            "                uniform sampler2D tInput;\n" +
            "                uniform float uMixRadius;\n" +
            "                uniform vec2 uPos;\n" +
            "                uniform float uFrequency;\n" +
            "                uniform float uAmplitude;\n" +
            "                uniform float uRotation;\n" +
            "                uniform float uTime;\n" +
            "                uniform vec2 uResolution;\n" +
            "                uniform vec2 uMousePos;\n" +
            "                uniform float uTrackMouse;\n" +
            "                out vec4 fragColor;\n" +
            "                void main() {\n" +
            "                    vec2 uv = vUv;\n" +
            "                    vec2 waveCoord = vUv.xy * 2.0 - 1.0;\n" +
            "                    float time = uTime * 0.25;\n" +
            "                    float frequency = 20.0 * uFrequency;\n" +
            "                    float amp = uAmplitude * 0.2;\n" +
            "                    float waveX = sin((waveCoord.y + uPos.y) * frequency + (time * PI3)) * amp;\n" +
            "                    float waveY = sin((waveCoord.x - uPos.x) * frequency + (time * PI3)) * amp;\n" +
            "                    waveCoord.xy += vec2(mix(waveX, 0., uRotation), mix(0., waveY, uRotation));\n" +
            "                    vec2 finalUV = waveCoord * 0.5 + 0.5;\n" +
            "                    float aspectRatio = uResolution.x/uResolution.y;\n" +
            "                    vec2 mPos = uPos + mix(vec2(0), (uMousePos-0.5), uTrackMouse);\n" +
            "                    vec2 pos = mix(uPos, mPos, floor(uMixRadius));\n" +
            "                    float dist = (max(0.,1.-distance(uv * vec2(aspectRatio, 1), mPos * vec2(aspectRatio, 1)) * 4. * (1. - uMixRadius)));\n" +
            "                    uv = mix(uv, finalUV, dist);\n" +
            "                    fragColor = texture(tInput, uv);\n" +
            "                }",
        });

        this.shatterMaterial = new Jt(this.renderer.gl, {
          vertexShader: Rs,
          blend: true,
          fragmentShader:
            "\n" +
            "                #version 300 es\n" +
            "                precision mediump float;\n" +
            "                #define PI 3.14159265359\n" +
            "                in vec2 vUv;\n" +
            "                uniform sampler2D tInput;\n" +
            "                uniform float uAmount;\n" +
            "                uniform float uSpread;\n" +
            "                uniform float uAngle;\n" +
            "                uniform float uTime;\n" +
            "                uniform float uSkew;\n" +
            "                uniform vec2 uPos;\n" +
            "                uniform vec2 uResolution;\n" +
            "                uniform float uMixRadius;\n" +
            "                uniform int uMixRadiusInvert;\n" +
            "                uniform int uEasing;\n" +
            "                uniform vec2 uMousePos;\n" +
            "                uniform float uTrackMouse;\n" +
            "                vec2 random2(vec2 p) {\n" +
            "                    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);\n" +
            "                }\n" +
            "                mat2 rot(float a) {\n" +
            "                    return mat2(cos(a),-sin(a),sin(a),cos(a));\n" +
            "                }\n" +
            "                out vec4 fragColor;\n" +
            "                void main() {\n" +
            "                    vec2 uv = vUv;\n" +
            "                    float aspectRatio = uResolution.x/uResolution.y;\n" +
            "                    vec2 skew = mix(vec2(1), vec2(1, 0), uSkew);\n" +
            "                    vec2 st = (uv - uPos) * vec2(aspectRatio, 1.) * 50. * uAmount;\n" +
            "                    st = st * rot(uAngle * 2. * PI) * skew;\n" +
            "                    vec2 i_st = floor(st);\n" +
            "                    vec2 f_st = fract(st);\n" +
            "                    float m_dist = 15.;\n" +
            "                    vec2 m_point;\n" +
            "                    vec2 d;\n" +
            "                    for (int j=-1; j<=1; j++) {\n" +
            "                        for (int i=-1; i<=1; i++) {\n" +
            "                            vec2 neighbor = vec2(float(i),float(j));\n" +
            "                            vec2 point = random2(i_st + neighbor);\n" +
            "                            point = 0.5 + 0.5 * sin(5. + uTime * 0.2 + 6.2831*point);\n" +
            "                            vec2 diff = neighbor + point - f_st;\n" +
            "                            float dist = length(diff);\n" +
            "                            if (dist < m_dist) {\n" +
            "                                m_dist = dist;\n" +
            "                                m_point = point;\n" +
            "                                d = diff;\n" +
            "                            }\n" +
            "                        }\n" +
            "                    }\n" +
            "                    vec2 offset = (m_point * 0.2 * uSpread * 2.) - (uSpread * 0.2);\n" +
            "                    vec2 mPos = uPos + mix(vec2(0), (uMousePos-0.5), uTrackMouse);\n" +
            "                    vec2 pos = mix(uPos, mPos, floor(uMixRadius));\n" +
            "                    float dist = (max(0.,1.-distance(uv * vec2(aspectRatio, 1), mPos * vec2(aspectRatio, 1)) * 4. * (1. - uMixRadius)));\n" +
            "                    vec4 color = texture(tInput, uv + offset * dist);\n" +
            "                    fragColor = color;\n" +
            "                }",
          depthTest: false,
        });

        this.bokehMaterialFast = new Jt(this.renderer.gl, {
          vertexShader: Rs,
          blend: true,
          fragmentShader:
            "\n" +
            "                #version 300 es\n" +
            "                precision highp float;\n" +
            "                in vec2 vUv;\n" +
            "                out vec4 fragColor;\n" +
            "                #define PI 3.14159265\n" +
            "                #define PI2 6.28318530718\n" +
            "                #define ITERATIONS 50.0\n" +
            "                #define GOLDEN_ANGLE 2.39996323\n" +
            "                #define RAY_COUNT 9.0\n" +
            "                uniform float uRayRotation;\n" +
            "                uniform sampler2D tInput;\n" +
            "                uniform sampler2D tBgTexture;\n" +
            "                uniform sampler2D tBlueNoise;\n" +
            "                uniform float uAmount;\n" +
            "                uniform float uTilt;\n" +
            "                uniform float uTime;\n" +
            "                uniform vec2 uPos;\n" +
            "                uniform int uPass;\n" +
            "                uniform vec2 uResolution;\n" +
            "                uniform vec2 uMousePos;\n" +
            "                uniform float uTrackMouse;\n" +
            "                uniform vec2 uBlueNoiseResolution;\n" +
            "                vec2 Sample(in float theta, inout float r) {\n" +
            "                    r += 1.0 / r;\n" +
            "                    return (r-1.0) * vec2(cos(theta), sin(theta));\n" +
            "                }\n" +
            "                float getBlueNoiseOffset(vec2 st) {\n" +
            "                    ivec2 texSize = ivec2(uBlueNoiseResolution);\n" +
            "                    vec4 blueNoise = texelFetch(tBlueNoise, ivec2(fract(st * (uResolution)/vec2(texSize) * vec2(texSize.x/texSize.y, 1.0)) * vec2(texSize)) % texSize, 0);\n" +
            "                    return mod((blueNoise.r - 0.5) * PI2, PI2);\n" +
            "                }\n" +
            "                float rayMask(float theta) {\n" +
            "                    float rays = abs(cos((theta + uRayRotation) * RAY_COUNT));\n" +
            "                    return pow(rays, 12.0);\n" +
            "                }\n" +
            "                vec4 Bokeh(sampler2D tex, vec2 uv, float blurRadius) {\n" +
            "                    vec3 accumulatedColor = vec3(0.0);\n" +
            "                    vec3 accumulatedWeights = vec3(0.0);\n" +
            "                    float accumulatedAlpha = 0.0;\n" +
            "                    float aspectRatio = uResolution.x / uResolution.y;\n" +
            "                    vec2 pixelSize = vec2(1.0 / aspectRatio, 1.0) * 0.04 * 0.075;\n" +
            "                    float r = 1.0;\n" +
            "                    float noiseOffset = (getBlueNoiseOffset(uv) - 0.5) * 0.003;\n" +
            "                    float noiseAngle = noiseOffset * PI2 * 0.4;\n" +
            "                    mat2 rotationMatrix = mat2(\n" +
            "                        cos(noiseAngle), -sin(noiseAngle),\n" +
            "                        sin(noiseAngle), cos(noiseAngle)\n" +
            "                    );\n" +
            "                    for (float j = 0.0; j < GOLDEN_ANGLE * ITERATIONS; j += GOLDEN_ANGLE) {\n" +
            "                        vec2 offset = Sample(j, r) * pixelSize;\n" +
            "                        float theta = atan(offset.y, offset.x);\n" +
            "                        float ray = rayMask(theta);\n" +
            "                        float jitterAmount = 0.015 * (sin(j * 0.1) * 0.5 + 0.5);\n" +
            "                        offset *= 1.0 + jitterAmount * sin(j * 0.7 + noiseOffset);\n" +
            "                        offset *= mix(1.2, 0.04, ray);\n" +
            "                        vec2 sampleOffset = rotationMatrix * offset;\n" +
            "                        vec4 colorSample = texture(tex, uv + sampleOffset);\n" +
            "                        float highlight = smoothstep(0.7, 1.0, max(colorSample.r, max(colorSample.g, colorSample.b)));\n" +
            "                        vec3 whiteBoost = mix(colorSample.rgb, vec3(1.0), highlight * 0.3);\n" +
            "                        vec3 bokehWeight = vec3(5.0) + pow(colorSample.rgb, vec3(9.0)) * 150.0;\n" +
            "                        bokehWeight *= (1.0 + ray * 4.0);\n" +
            "                        accumulatedAlpha += colorSample.a;\n" +
            "                        accumulatedColor += whiteBoost * bokehWeight;\n" +
            "                        accumulatedWeights += bokehWeight;\n" +
            "                    }\n" +
            "                    return vec4(accumulatedColor / accumulatedWeights, accumulatedAlpha / ITERATIONS);\n" +
            "                }\n" +
            "                void main() {\n" +
            "                    vec2 uv = vUv;\n" +
            "                    if (uAmount == 0.0) {\n" +
            "                        fragColor = vec4(0.0);\n" +
            "                        return;\n" +
            "                    }\n" +
            "                    vec2 pos = uPos + mix(vec2(0), (uMousePos-0.5), uTrackMouse);\n" +
            "                    float dis = distance(uv, pos) * 1000.0;\n" +
            "                    float tilt = mix(1.0 - dis * 0.001, dis * 0.001, uTilt);\n" +
            "                    float blurRadius = uAmount * tilt;\n" +
            "                    fragColor = Bokeh(tInput, uv, blurRadius);\n" +
            "                }",
          depthTest: false,
        });

        this.blankBuffer = new qe(this.renderer.gl, {
          width: 1,
          height: 1,
          linear: false,
        });
        this.bufferRead = new qe(this.renderer.gl, {
          width: 1,
          height: 1,
          linear: true,
        });
        this.bufferWrite = new qe(this.renderer.gl, {
          width: 1,
          height: 1,
          linear: true,
        });
        this.backgroundBuffer = new qe(this.renderer.gl, {
          width: 1,
          height: 1,
          linear: true,
        });

        this.blueNoiseTex = ie.fromUrl(
          this.renderer.gl,
          this.getAttribute("noise-src"),
          {
            wrapS: this.renderer.gl.REPEAT,
            wrapT: this.renderer.gl.REPEAT,
            linear: true,
          },
        );

        this.backgrounsSrc = this.getAttribute("background-src") || "луч.jpg";
        this.currentTextureName = "default";
        this.textures = {
          default: ie.fromUrl(this.renderer.gl, this.backgrounsSrc, {
            useImageBitmap: SETTINGS.useImageBitmap,
            wrapS: this.renderer.gl.REPEAT,
            wrapT: this.renderer.gl.REPEAT,
            linear: true,
            anisotropy: 8,
            onLoaded: () => {
              this.isLoaded = true;
            },
          }),
        };
      }

      updateViewport() {
        const width = window.innerWidth * SETTINGS.resolutionScale;
        const height = window.innerHeight * SETTINGS.resolutionScale;
        ke.set(this.viewport, height, width);
      }

      update() {
        const lerp = this.stopped ? 1 : SETTINGS.motion.pointerLerp;
        this.currVignetteColor[0] +=
          (this.vignetteColor[0] - this.currVignetteColor[0]) * lerp;
        this.currVignetteColor[1] +=
          (this.vignetteColor[1] - this.currVignetteColor[1]) * lerp;
        this.currVignetteColor[2] +=
          (this.vignetteColor[2] - this.currVignetteColor[2]) * lerp;
        this.currBackgroundColor[0] +=
          (this.backgroundColor[0] - this.currBackgroundColor[0]) * lerp;
        this.currBackgroundColor[1] +=
          (this.backgroundColor[1] - this.currBackgroundColor[1]) * lerp;
        this.currBackgroundColor[2] +=
          (this.backgroundColor[2] - this.currBackgroundColor[2]) * lerp;
        this.currBackgroundColor2[0] +=
          (this.backgroundColor2[0] - this.currBackgroundColor2[0]) * lerp;
        this.currBackgroundColor2[1] +=
          (this.backgroundColor2[1] - this.currBackgroundColor2[1]) * lerp;
        this.currBackgroundColor2[2] +=
          (this.backgroundColor2[2] - this.currBackgroundColor2[2]) * lerp;
        this.currOutputColor[0] +=
          (this.outputColor[0] - this.currOutputColor[0]) * lerp;
        this.currOutputColor[1] +=
          (this.outputColor[1] - this.currOutputColor[1]) * lerp;
        this.currOutputColor[2] +=
          (this.outputColor[2] - this.currOutputColor[2]) * lerp;
        this.currOutputColor2[0] +=
          (this.outputColor2[0] - this.currOutputColor2[0]) * lerp;
        this.currOutputColor2[1] +=
          (this.outputColor2[1] - this.currOutputColor2[1]) * lerp;
        this.currOutputColor2[2] +=
          (this.outputColor2[2] - this.currOutputColor2[2]) * lerp;

        this.updateViewport();

        const now = performance.now();
        const delta = now - this.last;
        if (this.stopped || this.forceCenter) {
          this.currPointer[0] = 0.5;
          this.currPointer[1] = 0.5;
        } else {
          this.currPointer[0] += (this.pointer[0] - this.currPointer[0]) * lerp;
          this.currPointer[1] += (this.pointer[1] - this.currPointer[1]) * lerp;
        }
        if (this.stopped || this.forceCenter) {
          this.currSinePointer[0] = 0.5;
          this.currSinePointer[1] = 0.5;
        } else {
          const waveLerp = SETTINGS.motion.waveLerp;
          this.currSinePointer[0] +=
            (this.pointer[0] - this.currSinePointer[0]) * waveLerp;
          this.currSinePointer[1] +=
            (this.pointer[1] - this.currSinePointer[1]) * waveLerp;
        }

        if (!this.stopped) this.elapsed += (delta / 1000) * 2;
        this.last = now;

        const outColor = this.currOutputColor;

        this.bufferPlane.material = this.backgroundMaterial;
        this.backgroundMaterial.setUniform(
          "uBgColor",
          this.currBackgroundColor,
        );
        this.backgroundMaterial.setUniform(
          "uBgColor2",
          this.currBackgroundColor2,
        );
        this.backgroundMaterial.setUniform(
          "uBgGradientPos",
          SETTINGS.background.gradientPos,
        );
        this.backgroundMaterial.setUniform(
          "uBgGradientPower",
          SETTINGS.background.gradientPower,
        );
        this.renderer.clearColor(0, 0, 0, 0);
        this.renderer.clear();
        this.renderer.render(
          this.bufferScene,
          this.bufferCamera,
          this.backgroundBuffer,
        );

        this.bufferPlane.material = this.backgroundMaterial;
        this.backgroundMaterial.setUniform(
          "uBgColor",
          this.currBackgroundColor,
        );
        this.backgroundMaterial.setUniform(
          "uBgColor2",
          this.currBackgroundColor2,
        );
        this.backgroundMaterial.setUniform(
          "uBgGradientPos",
          SETTINGS.background.gradientPos,
        );
        this.backgroundMaterial.setUniform(
          "uBgGradientPower",
          SETTINGS.background.gradientPower,
        );
        this.renderer.clearColor(0, 0, 0, 0);
        this.renderer.clear();
        this.renderer.render(
          this.bufferScene,
          this.bufferCamera,
          this.blankBuffer,
        );

        this.swapBuffers();

        this.bufferPlane.material = this.vignetteMaterial;
        this.vignetteMaterial.setUniform(
          "tBgTexture",
          this.textures[this.currentTextureName],
        );
        this.vignetteMaterial.setUniform("tInput", this.blankBuffer);
        this.vignetteMaterial.setUniform("uResolution", this.resolution);
        this.vignetteMaterial.setUniform("uRadius", SETTINGS.vignette.radius);
        this.vignetteMaterial.setUniform("uFalloff", SETTINGS.vignette.falloff);
        this.vignetteMaterial.setUniform(
          "uVignetteColor",
          this.currVignetteColor,
        );
        this.vignetteMaterial.setUniform("uColorAlpha", 1);
        this.vignetteMaterial.setUniform(
          "uDisplace",
          SETTINGS.vignette.displace,
        );
        this.vignetteMaterial.setUniform("uMix", SETTINGS.vignette.mix);
        this.vignetteMaterial.setUniform("uAngle", SETTINGS.vignette.angle);
        this.vignetteMaterial.setUniform("uSkew", SETTINGS.vignette.skew);
        this.vignetteMaterial.setUniform("uPos", this.currPointer);
        this.vignetteMaterial.setUniform(
          "uClearColor",
          this.currBackgroundColor,
        );
        this.renderer.clearColor(outColor[0], outColor[1], outColor[2], 0);
        this.renderer.clear();
        this.renderer.render(
          this.bufferScene,
          this.bufferCamera,
          this.bufferWrite,
        );

        this.swapBuffers();

        this.bufferPlane.material = this.sineMaterial;
        this.sineMaterial.setUniform("tInput", this.bufferRead);
        this.sineMaterial.setUniform("uResolution", this.resolution);
        this.sineMaterial.setUniform("uTime", this.elapsed);
        this.sineMaterial.setUniform("uPos", [0.5, 0.5]);
        this.sineMaterial.setUniform("uFrequency", SETTINGS.sine.frequency);
        this.sineMaterial.setUniform("uAmplitude", SETTINGS.sine.amplitude);
        this.sineMaterial.setUniform("uFalloff", SETTINGS.sine.falloff);
        this.sineMaterial.setUniform("uRotation", SETTINGS.sine.rotation);
        this.sineMaterial.setUniform("uPhase", SETTINGS.sine.phase);
        this.sineMaterial.setUniform("uSpeed", SETTINGS.sine.speed);
        this.sineMaterial.setUniform("uMixRadius", SETTINGS.sine.mixRadius);
        this.sineMaterial.setUniform("uTrackMouse", SETTINGS.sine.trackMouse);
        this.sineMaterial.setUniform("uMousePos", this.currSinePointer);
        this.renderer.clearColor(outColor[0], outColor[1], outColor[2], 0);
        this.renderer.clear();
        this.renderer.render(
          this.bufferScene,
          this.bufferCamera,
          this.bufferWrite,
        );

        this.swapBuffers();

        this.bufferPlane.material = this.shatterMaterial;
        this.shatterMaterial.setUniform("tInput", this.bufferRead);
        this.shatterMaterial.setUniform("uResolution", this.resolution);
        this.shatterMaterial.setUniform("uRadius", SETTINGS.shatter.radius);
        {
          const dx = this.currPointer[0] - 0.5;
          const dy = this.currPointer[1] - 0.5;
          const base = SETTINGS.shatter.angle / 360;
          const turn = Math.atan2(dy, dx) / (2 * Math.PI);
          const range = SETTINGS.motion.shatterRange;
          let target = base + turn * range;
          target = ((target % 1) + 1) % 1;
          let diff = target - this.currShatterAngle;
          if (diff > 0.5) diff -= 1;
          if (diff < -0.5) diff += 1;
          this.currShatterAngle += diff * SETTINGS.motion.shatterLerp;
          this.currShatterAngle = ((this.currShatterAngle % 1) + 1) % 1;
          this.shatterMaterial.setUniform("uAngle", this.currShatterAngle);
        }
        this.shatterMaterial.setUniform("uAmount", SETTINGS.shatter.scale);
        this.shatterMaterial.setUniform("uSpread", SETTINGS.shatter.amount);
        this.shatterMaterial.setUniform("uEasing", SETTINGS.shatter.easing);
        this.shatterMaterial.setUniform("uSkew", SETTINGS.shatter.skew);
        this.shatterMaterial.setUniform("uTime", this.elapsed);
        this.shatterMaterial.setUniform("uPos", [0.5, 0.5]);
        this.shatterMaterial.setUniform(
          "uMixRadius",
          SETTINGS.shatter.mixRadius,
        );
        this.renderer.clearColor(outColor[0], outColor[1], outColor[2], 0);
        this.renderer.clear();
        this.renderer.render(
          this.bufferScene,
          this.bufferCamera,
          this.bufferWrite,
        );

        this.swapBuffers();

        this.bufferPlane.material = this.bokehMaterialFast;
        this.bokehMaterialFast.setUniform("tInput", this.bufferRead);
        this.bokehMaterialFast.setUniform("tBgTexture", this.backgroundBuffer);
        this.bokehMaterialFast.setUniform("tBlueNoise", this.blueNoiseTex);
        this.bokehMaterialFast.setUniform(
          "uBlueNoiseResolution",
          SETTINGS.blueNoiseResolution,
        );
        this.bokehMaterialFast.setUniform("uResolution", [
          this.resolution[0],
          this.resolution[1],
        ]);
        this.bokehMaterialFast.setUniform("uAmount", SETTINGS.bokeh.radius);
        this.bokehMaterialFast.setUniform("uTilt", SETTINGS.bokeh.tilt);
        this.bokehMaterialFast.setUniform("uTime", this.elapsed);
        this.bokehMaterialFast.setUniform("uPos", [0.5, 0.5]);
        this.bokehMaterialFast.setUniform(
          "uMixRadius",
          SETTINGS.bokeh.mixRadius,
        );
        this.bokehMaterialFast.setUniform("uPass", 0);
        {
          const angle =
            Math.atan2(this.currPointer[1] - 0.5, this.currPointer[0] - 0.5) -
            Math.PI / 4;
          const halfTurn = (((angle + Math.PI) % Math.PI) + Math.PI) % Math.PI;
          let diff = halfTurn - this.currRayRotation;
          if (diff > Math.PI / 2) diff -= Math.PI;
          if (diff < -Math.PI / 2) diff += Math.PI;
          this.currRayRotation += diff * SETTINGS.motion.rayLerp;
          this.currRayRotation =
            (((this.currRayRotation + Math.PI) % Math.PI) + Math.PI) % Math.PI;
          this.bokehMaterialFast.setUniform(
            "uRayRotation",
            this.currRayRotation,
          );
        }
        this.renderer.clearColor(outColor[0], outColor[1], outColor[2], 0);
        this.renderer.clear();
        this.renderer.render(
          this.bufferScene,
          this.bufferCamera,
          this.bufferWrite,
        );

        this.swapBuffers();

        this.bufferPlane.material = this.outputMaterial;
        this.outputMaterial.setUniform("uLoaded", this.isLoaded ? 1 : 0);
        this.outputMaterial.setUniform(
          "tBgTexture",
          this.textures[this.currentTextureName],
        );
        this.outputMaterial.setUniform("tInput", this.bufferRead);
        this.outputMaterial.setUniform("uOutputColor", this.currOutputColor);
        this.outputMaterial.setUniform("uOutputColor2", this.currOutputColor2);
        this.outputMaterial.setUniform(
          "uOutputGradientPos",
          SETTINGS.output.gradientPos,
        );
        this.outputMaterial.setUniform(
          "uOutputGradientPower",
          SETTINGS.output.gradientPower,
        );
        this.outputMaterial.setUniform("uBgColor", this.currBackgroundColor);
        this.renderer.clearColor(
          this.currBackgroundColor[0],
          this.currBackgroundColor[1],
          this.currBackgroundColor[2],
          0,
        );
        this.renderer.clear();
        this.renderer.render(this.bufferScene, this.bufferCamera);

        if (!this.stopped) this.frameIndex++;
      }
    },
  );

  void 0;
});
