function Hs(e, t) {
  const n = Object.create(null),
    r = e.split(',');
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? s => !!n[s.toLowerCase()] : s => !!n[s];
}
const ue = {},
  Ut = [],
  qe = () => {},
  $a = () => !1,
  La = /^on[^a-z]/,
  Ln = e => La.test(e),
  $s = e => e.startsWith('onUpdate:'),
  _e = Object.assign,
  Ls = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Na = Object.prototype.hasOwnProperty,
  ee = (e, t) => Na.call(e, t),
  J = Array.isArray,
  Kt = e => Nn(e) === '[object Map]',
  Li = e => Nn(e) === '[object Set]',
  ja = e => Nn(e) === '[object RegExp]',
  X = e => typeof e == 'function',
  he = e => typeof e == 'string',
  xr = e => typeof e == 'symbol',
  fe = e => e !== null && typeof e == 'object',
  Ni = e => (fe(e) || X(e)) && X(e.then) && X(e.catch),
  ji = Object.prototype.toString,
  Nn = e => ji.call(e),
  Fa = e => Nn(e).slice(8, -1),
  Fi = e => Nn(e) === '[object Object]',
  Ns = e => he(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  yn = Hs(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  Pr = e => {
    const t = Object.create(null);
    return n => t[n] || (t[n] = e(n));
  },
  Ba = /-(\w)/g,
  Ge = Pr(e => e.replace(Ba, (t, n) => (n ? n.toUpperCase() : ''))),
  Da = /\B([A-Z])/g,
  rn = Pr(e => e.replace(Da, '-$1').toLowerCase()),
  kr = Pr(e => e.charAt(0).toUpperCase() + e.slice(1)),
  Ur = Pr(e => (e ? `on${kr(e)}` : '')),
  It = (e, t) => !Object.is(e, t),
  _n = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  cr = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Ua = e => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  Bi = e => {
    const t = he(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let go;
const ss = () =>
  go ||
  (go =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : {});
function Ar(e) {
  if (J(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = he(r) ? Va(r) : Ar(r);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else if (he(e) || fe(e)) return e;
}
const Ka = /;(?![^(]*\))/g,
  Wa = /:([^]+)/,
  qa = /\/\*[^]*?\*\//g;
function Va(e) {
  const t = {};
  return (
    e
      .replace(qa, '')
      .split(Ka)
      .forEach(n => {
        if (n) {
          const r = n.split(Wa);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function Xt(e) {
  let t = '';
  if (he(e)) t = e;
  else if (J(e))
    for (let n = 0; n < e.length; n++) {
      const r = Xt(e[n]);
      r && (t += r + ' ');
    }
  else if (fe(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
function za(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !he(t) && (e.class = Xt(t)), n && (e.style = Ar(n)), e;
}
const Ja =
    'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  Qa = Hs(Ja);
function Di(e) {
  return !!e || e === '';
}
const Kg = e =>
    he(e)
      ? e
      : e == null
      ? ''
      : J(e) || (fe(e) && (e.toString === ji || !X(e.toString)))
      ? JSON.stringify(e, Ui, 2)
      : String(e),
  Ui = (e, t) =>
    t && t.__v_isRef
      ? Ui(e, t.value)
      : Kt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {}
          )
        }
      : Li(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : fe(t) && !J(t) && !Fi(t)
      ? String(t)
      : t;
let Se;
class Ki {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Se),
      !t && Se && (this.index = (Se.scopes || (Se.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = Se;
      try {
        return (Se = this), t();
      } finally {
        Se = n;
      }
    }
  }
  on() {
    Se = this;
  }
  off() {
    Se = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Xa(e) {
  return new Ki(e);
}
function Ya(e, t = Se) {
  t && t.active && t.effects.push(e);
}
function Wi() {
  return Se;
}
function Za(e) {
  Se && Se.cleanups.push(e);
}
const js = e => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  qi = e => (e.w & vt) > 0,
  Vi = e => (e.n & vt) > 0,
  Ga = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= vt;
  },
  ec = e => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        qi(s) && !Vi(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~vt),
          (s.n &= ~vt);
      }
      t.length = n;
    }
  },
  ur = new WeakMap();
let pn = 0,
  vt = 1;
const os = 30;
let Ke;
const St = Symbol(''),
  is = Symbol('');
class Fs {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Ya(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Ke,
      n = yt;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Ke),
        (Ke = this),
        (yt = !0),
        (vt = 1 << ++pn),
        pn <= os ? Ga(this) : mo(this),
        this.fn()
      );
    } finally {
      pn <= os && ec(this),
        (vt = 1 << --pn),
        (Ke = this.parent),
        (yt = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Ke === this
      ? (this.deferStop = !0)
      : this.active &&
        (mo(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function mo(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let yt = !0;
const zi = [];
function sn() {
  zi.push(yt), (yt = !1);
}
function on() {
  const e = zi.pop();
  yt = e === void 0 ? !0 : e;
}
function ke(e, t, n) {
  if (yt && Ke) {
    let r = ur.get(e);
    r || ur.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = js())), Ji(s);
  }
}
function Ji(e, t) {
  let n = !1;
  pn <= os ? Vi(e) || ((e.n |= vt), (n = !qi(e))) : (n = !e.has(Ke)),
    n && (e.add(Ke), Ke.deps.push(e));
}
function nt(e, t, n, r, s, o) {
  const i = ur.get(e);
  if (!i) return;
  let l = [];
  if (t === 'clear') l = [...i.values()];
  else if (n === 'length' && J(e)) {
    const a = Number(r);
    i.forEach((u, c) => {
      (c === 'length' || (!xr(c) && c >= a)) && l.push(u);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case 'add':
        J(e)
          ? Ns(n) && l.push(i.get('length'))
          : (l.push(i.get(St)), Kt(e) && l.push(i.get(is)));
        break;
      case 'delete':
        J(e) || (l.push(i.get(St)), Kt(e) && l.push(i.get(is)));
        break;
      case 'set':
        Kt(e) && l.push(i.get(St));
        break;
    }
  if (l.length === 1) l[0] && ls(l[0]);
  else {
    const a = [];
    for (const u of l) u && a.push(...u);
    ls(js(a));
  }
}
function ls(e, t) {
  const n = J(e) ? e : [...e];
  for (const r of n) r.computed && yo(r);
  for (const r of n) r.computed || yo(r);
}
function yo(e, t) {
  (e !== Ke || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function tc(e, t) {
  var n;
  return (n = ur.get(e)) == null ? void 0 : n.get(t);
}
const nc = Hs('__proto__,__v_isRef,__isVue'),
  Qi = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter(e => e !== 'arguments' && e !== 'caller')
      .map(e => Symbol[e])
      .filter(xr)
  ),
  _o = rc();
function rc() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach(t => {
      e[t] = function (...n) {
        const r = ne(this);
        for (let o = 0, i = this.length; o < i; o++) ke(r, 'get', o + '');
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(ne)) : s;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(t => {
      e[t] = function (...n) {
        sn();
        const r = ne(this)[t].apply(this, n);
        return on(), r;
      };
    }),
    e
  );
}
function sc(e) {
  const t = ne(this);
  return ke(t, 'has', e), t.hasOwnProperty(e);
}
class Xi {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._shallow = n);
  }
  get(t, n, r) {
    const s = this._isReadonly,
      o = this._shallow;
    if (n === '__v_isReactive') return !s;
    if (n === '__v_isReadonly') return s;
    if (n === '__v_isShallow') return o;
    if (n === '__v_raw' && r === (s ? (o ? yc : el) : o ? Gi : Zi).get(t))
      return t;
    const i = J(t);
    if (!s) {
      if (i && ee(_o, n)) return Reflect.get(_o, n, r);
      if (n === 'hasOwnProperty') return sc;
    }
    const l = Reflect.get(t, n, r);
    return (xr(n) ? Qi.has(n) : nc(n)) || (s || ke(t, 'get', n), o)
      ? l
      : ye(l)
      ? i && Ns(n)
        ? l
        : l.value
      : fe(l)
      ? s
        ? tl(l)
        : rt(l)
      : l;
  }
}
class Yi extends Xi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, r, s) {
    let o = t[n];
    if (Mt(o) && ye(o) && !ye(r)) return !1;
    if (
      !this._shallow &&
      (!fr(r) && !Mt(r) && ((o = ne(o)), (r = ne(r))), !J(t) && ye(o) && !ye(r))
    )
      return (o.value = r), !0;
    const i = J(t) && Ns(n) ? Number(n) < t.length : ee(t, n),
      l = Reflect.set(t, n, r, s);
    return (
      t === ne(s) && (i ? It(r, o) && nt(t, 'set', n, r) : nt(t, 'add', n, r)),
      l
    );
  }
  deleteProperty(t, n) {
    const r = ee(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && r && nt(t, 'delete', n, void 0), s;
  }
  has(t, n) {
    const r = Reflect.has(t, n);
    return (!xr(n) || !Qi.has(n)) && ke(t, 'has', n), r;
  }
  ownKeys(t) {
    return ke(t, 'iterate', J(t) ? 'length' : St), Reflect.ownKeys(t);
  }
}
class oc extends Xi {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const ic = new Yi(),
  lc = new oc(),
  ac = new Yi(!0),
  Bs = e => e,
  Sr = e => Reflect.getPrototypeOf(e);
function Vn(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = ne(e),
    o = ne(t);
  n || (It(t, o) && ke(s, 'get', t), ke(s, 'get', o));
  const { has: i } = Sr(s),
    l = r ? Bs : n ? Ks : Rn;
  if (i.call(s, t)) return l(e.get(t));
  if (i.call(s, o)) return l(e.get(o));
  e !== s && e.get(t);
}
function zn(e, t = !1) {
  const n = this.__v_raw,
    r = ne(n),
    s = ne(e);
  return (
    t || (It(e, s) && ke(r, 'has', e), ke(r, 'has', s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function Jn(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ke(ne(e), 'iterate', St), Reflect.get(e, 'size', e)
  );
}
function vo(e) {
  e = ne(e);
  const t = ne(this);
  return Sr(t).has.call(t, e) || (t.add(e), nt(t, 'add', e, e)), this;
}
function bo(e, t) {
  t = ne(t);
  const n = ne(this),
    { has: r, get: s } = Sr(n);
  let o = r.call(n, e);
  o || ((e = ne(e)), (o = r.call(n, e)));
  const i = s.call(n, e);
  return (
    n.set(e, t), o ? It(t, i) && nt(n, 'set', e, t) : nt(n, 'add', e, t), this
  );
}
function wo(e) {
  const t = ne(this),
    { has: n, get: r } = Sr(t);
  let s = n.call(t, e);
  s || ((e = ne(e)), (s = n.call(t, e))), r && r.call(t, e);
  const o = t.delete(e);
  return s && nt(t, 'delete', e, void 0), o;
}
function Eo() {
  const e = ne(this),
    t = e.size !== 0,
    n = e.clear();
  return t && nt(e, 'clear', void 0, void 0), n;
}
function Qn(e, t) {
  return function (r, s) {
    const o = this,
      i = o.__v_raw,
      l = ne(i),
      a = t ? Bs : e ? Ks : Rn;
    return (
      !e && ke(l, 'iterate', St), i.forEach((u, c) => r.call(s, a(u), a(c), o))
    );
  };
}
function Xn(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = ne(s),
      i = Kt(o),
      l = e === 'entries' || (e === Symbol.iterator && i),
      a = e === 'keys' && i,
      u = s[e](...r),
      c = n ? Bs : t ? Ks : Rn;
    return (
      !t && ke(o, 'iterate', a ? is : St),
      {
        next() {
          const { value: f, done: d } = u.next();
          return d
            ? { value: f, done: d }
            : { value: l ? [c(f[0]), c(f[1])] : c(f), done: d };
        },
        [Symbol.iterator]() {
          return this;
        }
      }
    );
  };
}
function at(e) {
  return function (...t) {
    return e === 'delete' ? !1 : this;
  };
}
function cc() {
  const e = {
      get(o) {
        return Vn(this, o);
      },
      get size() {
        return Jn(this);
      },
      has: zn,
      add: vo,
      set: bo,
      delete: wo,
      clear: Eo,
      forEach: Qn(!1, !1)
    },
    t = {
      get(o) {
        return Vn(this, o, !1, !0);
      },
      get size() {
        return Jn(this);
      },
      has: zn,
      add: vo,
      set: bo,
      delete: wo,
      clear: Eo,
      forEach: Qn(!1, !0)
    },
    n = {
      get(o) {
        return Vn(this, o, !0);
      },
      get size() {
        return Jn(this, !0);
      },
      has(o) {
        return zn.call(this, o, !0);
      },
      add: at('add'),
      set: at('set'),
      delete: at('delete'),
      clear: at('clear'),
      forEach: Qn(!0, !1)
    },
    r = {
      get(o) {
        return Vn(this, o, !0, !0);
      },
      get size() {
        return Jn(this, !0);
      },
      has(o) {
        return zn.call(this, o, !0);
      },
      add: at('add'),
      set: at('set'),
      delete: at('delete'),
      clear: at('clear'),
      forEach: Qn(!0, !0)
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach(o => {
      (e[o] = Xn(o, !1, !1)),
        (n[o] = Xn(o, !0, !1)),
        (t[o] = Xn(o, !1, !0)),
        (r[o] = Xn(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [uc, fc, dc, hc] = cc();
function Ds(e, t) {
  const n = t ? (e ? hc : dc) : e ? fc : uc;
  return (r, s, o) =>
    s === '__v_isReactive'
      ? !e
      : s === '__v_isReadonly'
      ? e
      : s === '__v_raw'
      ? r
      : Reflect.get(ee(n, s) && s in r ? n : r, s, o);
}
const pc = { get: Ds(!1, !1) },
  gc = { get: Ds(!1, !0) },
  mc = { get: Ds(!0, !1) },
  Zi = new WeakMap(),
  Gi = new WeakMap(),
  el = new WeakMap(),
  yc = new WeakMap();
function _c(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function vc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : _c(Fa(e));
}
function rt(e) {
  return Mt(e) ? e : Us(e, !1, ic, pc, Zi);
}
function jn(e) {
  return Us(e, !1, ac, gc, Gi);
}
function tl(e) {
  return Us(e, !0, lc, mc, el);
}
function Us(e, t, n, r, s) {
  if (!fe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = s.get(e);
  if (o) return o;
  const i = vc(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? r : n);
  return s.set(e, l), l;
}
function Wt(e) {
  return Mt(e) ? Wt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Mt(e) {
  return !!(e && e.__v_isReadonly);
}
function fr(e) {
  return !!(e && e.__v_isShallow);
}
function nl(e) {
  return Wt(e) || Mt(e);
}
function ne(e) {
  const t = e && e.__v_raw;
  return t ? ne(t) : e;
}
function rl(e) {
  return cr(e, '__v_skip', !0), e;
}
const Rn = e => (fe(e) ? rt(e) : e),
  Ks = e => (fe(e) ? tl(e) : e);
function sl(e) {
  yt && Ke && ((e = ne(e)), Ji(e.dep || (e.dep = js())));
}
function ol(e, t) {
  e = ne(e);
  const n = e.dep;
  n && ls(n);
}
function ye(e) {
  return !!(e && e.__v_isRef === !0);
}
function Ie(e) {
  return il(e, !1);
}
function xn(e) {
  return il(e, !0);
}
function il(e, t) {
  return ye(e) ? e : new bc(e, t);
}
class bc {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : ne(t)),
      (this._value = n ? t : Rn(t));
  }
  get value() {
    return sl(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || fr(t) || Mt(t);
    (t = n ? t : ne(t)),
      It(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Rn(t)), ol(this));
  }
}
function te(e) {
  return ye(e) ? e.value : e;
}
const wc = {
  get: (e, t, n) => te(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return ye(s) && !ye(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  }
};
function ll(e) {
  return Wt(e) ? e : new Proxy(e, wc);
}
class Ec {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return tc(ne(this._object), this._key);
  }
}
class Cc {
  constructor(t) {
    (this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
  }
  get value() {
    return this._getter();
  }
}
function Tc(e, t, n) {
  return ye(e)
    ? e
    : X(e)
    ? new Cc(e)
    : fe(e) && arguments.length > 1
    ? Rc(e, t, n)
    : Ie(e);
}
function Rc(e, t, n) {
  const r = e[t];
  return ye(r) ? r : new Ec(e, t, n);
}
class xc {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Fs(t, () => {
        this._dirty || ((this._dirty = !0), ol(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = ne(this);
    return (
      sl(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function Pc(e, t, n = !1) {
  let r, s;
  const o = X(e);
  return (
    o ? ((r = e), (s = qe)) : ((r = e.get), (s = e.set)),
    new xc(r, s, o || !s, n)
  );
}
function _t(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    ln(o, t, n);
  }
  return s;
}
function je(e, t, n, r) {
  if (X(e)) {
    const o = _t(e, t, n, r);
    return (
      o &&
        Ni(o) &&
        o.catch(i => {
          ln(i, t, n);
        }),
      o
    );
  }
  const s = [];
  for (let o = 0; o < e.length; o++) s.push(je(e[o], t, n, r));
  return s;
}
function ln(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = n;
    for (; o; ) {
      const u = o.ec;
      if (u) {
        for (let c = 0; c < u.length; c++) if (u[c](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const a = t.appContext.config.errorHandler;
    if (a) {
      _t(a, null, 10, [e, i, l]);
      return;
    }
  }
  kc(e, n, s, r);
}
function kc(e, t, n, r = !0) {
  console.error(e);
}
let Pn = !1,
  as = !1;
const we = [];
let Ze = 0;
const qt = [];
let tt = null,
  xt = 0;
const al = Promise.resolve();
let Ws = null;
function Ht(e) {
  const t = Ws || al;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ac(e) {
  let t = Ze + 1,
    n = we.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1,
      s = we[r],
      o = kn(s);
    o < e || (o === e && s.pre) ? (t = r + 1) : (n = r);
  }
  return t;
}
function Or(e) {
  (!we.length || !we.includes(e, Pn && e.allowRecurse ? Ze + 1 : Ze)) &&
    (e.id == null ? we.push(e) : we.splice(Ac(e.id), 0, e), cl());
}
function cl() {
  !Pn && !as && ((as = !0), (Ws = al.then(ul)));
}
function Sc(e) {
  const t = we.indexOf(e);
  t > Ze && we.splice(t, 1);
}
function cs(e) {
  J(e)
    ? qt.push(...e)
    : (!tt || !tt.includes(e, e.allowRecurse ? xt + 1 : xt)) && qt.push(e),
    cl();
}
function Co(e, t = Pn ? Ze + 1 : 0) {
  for (; t < we.length; t++) {
    const n = we[t];
    n && n.pre && (we.splice(t, 1), t--, n());
  }
}
function dr(e) {
  if (qt.length) {
    const t = [...new Set(qt)];
    if (((qt.length = 0), tt)) {
      tt.push(...t);
      return;
    }
    for (tt = t, tt.sort((n, r) => kn(n) - kn(r)), xt = 0; xt < tt.length; xt++)
      tt[xt]();
    (tt = null), (xt = 0);
  }
}
const kn = e => (e.id == null ? 1 / 0 : e.id),
  Oc = (e, t) => {
    const n = kn(e) - kn(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function ul(e) {
  (as = !1), (Pn = !0), we.sort(Oc);
  const t = qe;
  try {
    for (Ze = 0; Ze < we.length; Ze++) {
      const n = we[Ze];
      n && n.active !== !1 && _t(n, null, 14);
    }
  } finally {
    (Ze = 0),
      (we.length = 0),
      dr(),
      (Pn = !1),
      (Ws = null),
      (we.length || qt.length) && ul();
  }
}
function Ic(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || ue;
  let s = n;
  const o = t.startsWith('update:'),
    i = o && t.slice(7);
  if (i && i in r) {
    const c = `${i === 'modelValue' ? 'model' : i}Modifiers`,
      { number: f, trim: d } = r[c] || ue;
    d && (s = n.map(g => (he(g) ? g.trim() : g))), f && (s = n.map(Ua));
  }
  let l,
    a = r[(l = Ur(t))] || r[(l = Ur(Ge(t)))];
  !a && o && (a = r[(l = Ur(rn(t)))]), a && je(a, e, 6, s);
  const u = r[l + 'Once'];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), je(u, e, 6, s);
  }
}
function fl(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!X(e)) {
    const a = u => {
      const c = fl(u, t, !0);
      c && ((l = !0), _e(i, c));
    };
    !n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a);
  }
  return !o && !l
    ? (fe(e) && r.set(e, null), null)
    : (J(o) ? o.forEach(a => (i[a] = null)) : _e(i, o),
      fe(e) && r.set(e, i),
      i);
}
function Ir(e, t) {
  return !e || !Ln(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      ee(e, t[0].toLowerCase() + t.slice(1)) || ee(e, rn(t)) || ee(e, t));
}
let Pe = null,
  Mr = null;
function hr(e) {
  const t = Pe;
  return (Pe = e), (Mr = (e && e.type.__scopeId) || null), t;
}
function Wg(e) {
  Mr = e;
}
function qg() {
  Mr = null;
}
function ht(e, t = Pe, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && No(-1);
    const o = hr(t);
    let i;
    try {
      i = e(...s);
    } finally {
      hr(o), r._d && No(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Kr(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: a,
    emit: u,
    render: c,
    renderCache: f,
    data: d,
    setupState: g,
    ctx: v,
    inheritAttrs: E
  } = e;
  let A, x;
  const b = hr(e);
  try {
    if (n.shapeFlag & 4) {
      const m = s || r;
      (A = $e(c.call(m, m, f, o, g, d, v))), (x = a);
    } else {
      const m = t;
      (A = $e(
        m.length > 1 ? m(o, { attrs: a, slots: l, emit: u }) : m(o, null)
      )),
        (x = t.props ? a : Hc(a));
    }
  } catch (m) {
    (bn.length = 0), ln(m, e, 1), (A = re(Fe));
  }
  let y = A;
  if (x && E !== !1) {
    const m = Object.keys(x),
      { shapeFlag: T } = y;
    m.length && T & 7 && (i && m.some($s) && (x = $c(x, i)), (y = st(y, x)));
  }
  return (
    n.dirs && ((y = st(y)), (y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (y.transition = n.transition),
    (A = y),
    hr(b),
    A
  );
}
function Mc(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    if (On(r)) {
      if (r.type !== Fe || r.children === 'v-if') {
        if (t) return;
        t = r;
      }
    } else return;
  }
  return t;
}
const Hc = e => {
    let t;
    for (const n in e)
      (n === 'class' || n === 'style' || Ln(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  $c = (e, t) => {
    const n = {};
    for (const r in e) (!$s(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function Lc(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: l, patchFlag: a } = t,
    u = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return r ? To(r, i, u) : !!i;
    if (a & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const d = c[f];
        if (i[d] !== r[d] && !Ir(u, d)) return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? To(r, i, u)
        : !0
      : !!i;
  return !1;
}
function To(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !Ir(n, o)) return !0;
  }
  return !1;
}
function qs({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Vs = 'components';
function Nc(e, t) {
  return hl(Vs, e, !0, t) || e;
}
const dl = Symbol.for('v-ndc');
function jc(e) {
  return he(e) ? hl(Vs, e, !1) || e : e || dl;
}
function hl(e, t, n = !0, r = !1) {
  const s = Pe || ge;
  if (s) {
    const o = s.type;
    if (e === Vs) {
      const l = ms(o, !1);
      if (l && (l === t || l === Ge(t) || l === kr(Ge(t)))) return o;
    }
    const i = Ro(s[e] || o[e], t) || Ro(s.appContext[e], t);
    return !i && r ? o : i;
  }
}
function Ro(e, t) {
  return e && (e[t] || e[Ge(t)] || e[kr(Ge(t))]);
}
const pl = e => e.__isSuspense,
  Fc = {
    name: 'Suspense',
    __isSuspense: !0,
    process(e, t, n, r, s, o, i, l, a, u) {
      e == null ? Bc(t, n, r, s, o, i, l, a, u) : Dc(e, t, n, r, s, i, l, a, u);
    },
    hydrate: Uc,
    create: zs,
    normalize: Kc
  },
  gl = Fc;
function An(e, t) {
  const n = e.props && e.props[t];
  X(n) && n();
}
function Bc(e, t, n, r, s, o, i, l, a) {
  const {
      p: u,
      o: { createElement: c }
    } = a,
    f = c('div'),
    d = (e.suspense = zs(e, s, r, t, f, n, o, i, l, a));
  u(null, (d.pendingBranch = e.ssContent), f, null, r, d, o, i),
    d.deps > 0
      ? (An(e, 'onPending'),
        An(e, 'onFallback'),
        u(null, e.ssFallback, t, n, r, null, o, i),
        Vt(d, e.ssFallback))
      : d.resolve(!1, !0);
}
function Dc(e, t, n, r, s, o, i, l, { p: a, um: u, o: { createElement: c } }) {
  const f = (t.suspense = e.suspense);
  (f.vnode = t), (t.el = e.el);
  const d = t.ssContent,
    g = t.ssFallback,
    { activeBranch: v, pendingBranch: E, isInFallback: A, isHydrating: x } = f;
  if (E)
    (f.pendingBranch = d),
      We(d, E)
        ? (a(E, d, f.hiddenContainer, null, s, f, o, i, l),
          f.deps <= 0
            ? f.resolve()
            : A && (a(v, g, n, r, s, null, o, i, l), Vt(f, g)))
        : (f.pendingId++,
          x ? ((f.isHydrating = !1), (f.activeBranch = E)) : u(E, s, f),
          (f.deps = 0),
          (f.effects.length = 0),
          (f.hiddenContainer = c('div')),
          A
            ? (a(null, d, f.hiddenContainer, null, s, f, o, i, l),
              f.deps <= 0
                ? f.resolve()
                : (a(v, g, n, r, s, null, o, i, l), Vt(f, g)))
            : v && We(d, v)
            ? (a(v, d, n, r, s, f, o, i, l), f.resolve(!0))
            : (a(null, d, f.hiddenContainer, null, s, f, o, i, l),
              f.deps <= 0 && f.resolve()));
  else if (v && We(d, v)) a(v, d, n, r, s, f, o, i, l), Vt(f, d);
  else if (
    (An(t, 'onPending'),
    (f.pendingBranch = d),
    f.pendingId++,
    a(null, d, f.hiddenContainer, null, s, f, o, i, l),
    f.deps <= 0)
  )
    f.resolve();
  else {
    const { timeout: b, pendingId: y } = f;
    b > 0
      ? setTimeout(() => {
          f.pendingId === y && f.fallback(g);
        }, b)
      : b === 0 && f.fallback(g);
  }
}
function zs(e, t, n, r, s, o, i, l, a, u, c = !1) {
  const {
    p: f,
    m: d,
    um: g,
    n: v,
    o: { parentNode: E, remove: A }
  } = u;
  let x;
  const b = Wc(e);
  b && t != null && t.pendingBranch && ((x = t.pendingId), t.deps++);
  const y = e.props ? Bi(e.props.timeout) : void 0,
    m = {
      vnode: e,
      parent: t,
      parentComponent: n,
      isSVG: i,
      container: r,
      hiddenContainer: s,
      anchor: o,
      deps: 0,
      pendingId: 0,
      timeout: typeof y == 'number' ? y : -1,
      activeBranch: null,
      pendingBranch: null,
      isInFallback: !0,
      isHydrating: c,
      isUnmounted: !1,
      effects: [],
      resolve(T = !1, I = !1) {
        const {
          vnode: L,
          activeBranch: S,
          pendingBranch: B,
          pendingId: N,
          effects: Q,
          parentComponent: M,
          container: z
        } = m;
        let ae = !1;
        if (m.isHydrating) m.isHydrating = !1;
        else if (!T) {
          (ae = S && B.transition && B.transition.mode === 'out-in'),
            ae &&
              (S.transition.afterLeave = () => {
                N === m.pendingId && (d(B, z, Z, 0), cs(Q));
              });
          let { anchor: Z } = m;
          S && ((Z = v(S)), g(S, M, m, !0)), ae || d(B, z, Z, 0);
        }
        Vt(m, B), (m.pendingBranch = null), (m.isInFallback = !1);
        let le = m.parent,
          U = !1;
        for (; le; ) {
          if (le.pendingBranch) {
            le.effects.push(...Q), (U = !0);
            break;
          }
          le = le.parent;
        }
        !U && !ae && cs(Q),
          (m.effects = []),
          b &&
            t &&
            t.pendingBranch &&
            x === t.pendingId &&
            (t.deps--, t.deps === 0 && !I && t.resolve()),
          An(L, 'onResolve');
      },
      fallback(T) {
        if (!m.pendingBranch) return;
        const {
          vnode: I,
          activeBranch: L,
          parentComponent: S,
          container: B,
          isSVG: N
        } = m;
        An(I, 'onFallback');
        const Q = v(L),
          M = () => {
            m.isInFallback && (f(null, T, B, Q, S, null, N, l, a), Vt(m, T));
          },
          z = T.transition && T.transition.mode === 'out-in';
        z && (L.transition.afterLeave = M),
          (m.isInFallback = !0),
          g(L, S, null, !0),
          z || M();
      },
      move(T, I, L) {
        m.activeBranch && d(m.activeBranch, T, I, L), (m.container = T);
      },
      next() {
        return m.activeBranch && v(m.activeBranch);
      },
      registerDep(T, I) {
        const L = !!m.pendingBranch;
        L && m.deps++;
        const S = T.vnode.el;
        T.asyncDep
          .catch(B => {
            ln(B, T, 0);
          })
          .then(B => {
            if (T.isUnmounted || m.isUnmounted || m.pendingId !== T.suspenseId)
              return;
            T.asyncResolved = !0;
            const { vnode: N } = T;
            gs(T, B, !1), S && (N.el = S);
            const Q = !S && T.subTree.el;
            I(T, N, E(S || T.subTree.el), S ? null : v(T.subTree), m, i, a),
              Q && A(Q),
              qs(T, N.el),
              L && --m.deps === 0 && m.resolve();
          });
      },
      unmount(T, I) {
        (m.isUnmounted = !0),
          m.activeBranch && g(m.activeBranch, n, T, I),
          m.pendingBranch && g(m.pendingBranch, n, T, I);
      }
    };
  return m;
}
function Uc(e, t, n, r, s, o, i, l, a) {
  const u = (t.suspense = zs(
      t,
      r,
      n,
      e.parentNode,
      document.createElement('div'),
      null,
      s,
      o,
      i,
      l,
      !0
    )),
    c = a(e, (u.pendingBranch = t.ssContent), n, u, o, i);
  return u.deps === 0 && u.resolve(!1, !0), c;
}
function Kc(e) {
  const { shapeFlag: t, children: n } = e,
    r = t & 32;
  (e.ssContent = xo(r ? n.default : n)),
    (e.ssFallback = r ? xo(n.fallback) : re(Fe));
}
function xo(e) {
  let t;
  if (X(e)) {
    const n = Zt && e._c;
    n && ((e._d = !1), Le()), (e = e()), n && ((e._d = !0), (t = Ne), jl());
  }
  return (
    J(e) && (e = Mc(e)),
    (e = $e(e)),
    t && !e.dynamicChildren && (e.dynamicChildren = t.filter(n => n !== e)),
    e
  );
}
function ml(e, t) {
  t && t.pendingBranch
    ? J(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : cs(e);
}
function Vt(e, t) {
  e.activeBranch = t;
  const { vnode: n, parentComponent: r } = e,
    s = (n.el = t.el);
  r && r.subTree === n && ((r.vnode.el = s), qs(r, s));
}
function Wc(e) {
  var t;
  return (
    ((t = e.props) == null ? void 0 : t.suspensible) != null &&
    e.props.suspensible !== !1
  );
}
function qc(e, t) {
  return Js(e, null, t);
}
const Yn = {};
function zt(e, t, n) {
  return Js(e, t, n);
}
function Js(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = ue
) {
  var l;
  const a = Wi() === ((l = ge) == null ? void 0 : l.scope) ? ge : null;
  let u,
    c = !1,
    f = !1;
  if (
    (ye(e)
      ? ((u = () => e.value), (c = fr(e)))
      : Wt(e)
      ? ((u = () => e), (r = !0))
      : J(e)
      ? ((f = !0),
        (c = e.some(m => Wt(m) || fr(m))),
        (u = () =>
          e.map(m => {
            if (ye(m)) return m.value;
            if (Wt(m)) return At(m);
            if (X(m)) return _t(m, a, 2);
          })))
      : X(e)
      ? t
        ? (u = () => _t(e, a, 2))
        : (u = () => {
            if (!(a && a.isUnmounted)) return d && d(), je(e, a, 3, [g]);
          })
      : (u = qe),
    t && r)
  ) {
    const m = u;
    u = () => At(m());
  }
  let d,
    g = m => {
      d = b.onStop = () => {
        _t(m, a, 4);
      };
    },
    v;
  if (en)
    if (
      ((g = qe),
      t ? n && je(t, a, 3, [u(), f ? [] : void 0, g]) : u(),
      s === 'sync')
    ) {
      const m = Mu();
      v = m.__watcherHandles || (m.__watcherHandles = []);
    } else return qe;
  let E = f ? new Array(e.length).fill(Yn) : Yn;
  const A = () => {
    if (b.active)
      if (t) {
        const m = b.run();
        (r || c || (f ? m.some((T, I) => It(T, E[I])) : It(m, E))) &&
          (d && d(),
          je(t, a, 3, [m, E === Yn ? void 0 : f && E[0] === Yn ? [] : E, g]),
          (E = m));
      } else b.run();
  };
  A.allowRecurse = !!t;
  let x;
  s === 'sync'
    ? (x = A)
    : s === 'post'
    ? (x = () => ve(A, a && a.suspense))
    : ((A.pre = !0), a && (A.id = a.uid), (x = () => Or(A)));
  const b = new Fs(u, x);
  t
    ? n
      ? A()
      : (E = b.run())
    : s === 'post'
    ? ve(b.run.bind(b), a && a.suspense)
    : b.run();
  const y = () => {
    b.stop(), a && a.scope && Ls(a.scope.effects, b);
  };
  return v && v.push(y), y;
}
function Vc(e, t, n) {
  const r = this.proxy,
    s = he(e) ? (e.includes('.') ? yl(r, e) : () => r[e]) : e.bind(r, r);
  let o;
  X(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = ge;
  Gt(this);
  const l = Js(s, o.bind(r), n);
  return i ? Gt(i) : Ot(), l;
}
function yl(e, t) {
  const n = t.split('.');
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function At(e, t) {
  if (!fe(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ye(e))) At(e.value, t);
  else if (J(e)) for (let n = 0; n < e.length; n++) At(e[n], t);
  else if (Li(e) || Kt(e))
    e.forEach(n => {
      At(n, t);
    });
  else if (Fi(e)) for (const n in e) At(e[n], t);
  return e;
}
function Vg(e, t) {
  const n = Pe;
  if (n === null) return e;
  const r = Lr(n) || n.proxy,
    s = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, l, a, u = ue] = t[o];
    i &&
      (X(i) && (i = { mounted: i, updated: i }),
      i.deep && At(l),
      s.push({
        dir: i,
        instance: r,
        value: l,
        oldValue: void 0,
        arg: a,
        modifiers: u
      }));
  }
  return e;
}
function Ye(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    o && (l.oldValue = o[i].value);
    let a = l.dir[r];
    a && (sn(), je(a, n, 8, [e.el, l, e, t]), on());
  }
}
const pt = Symbol('_leaveCb'),
  Zn = Symbol('_enterCb');
function zc() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map()
  };
  return (
    Bn(() => {
      e.isMounted = !0;
    }),
    Dn(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const He = [Function, Array],
  _l = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: He,
    onEnter: He,
    onAfterEnter: He,
    onEnterCancelled: He,
    onBeforeLeave: He,
    onLeave: He,
    onAfterLeave: He,
    onLeaveCancelled: He,
    onBeforeAppear: He,
    onAppear: He,
    onAfterAppear: He,
    onAppearCancelled: He
  },
  Jc = {
    name: 'BaseTransition',
    props: _l,
    setup(e, { slots: t }) {
      const n = Kn(),
        r = zc();
      let s;
      return () => {
        const o = t.default && bl(t.default(), !0);
        if (!o || !o.length) return;
        let i = o[0];
        if (o.length > 1) {
          for (const E of o)
            if (E.type !== Fe) {
              i = E;
              break;
            }
        }
        const l = ne(e),
          { mode: a } = l;
        if (r.isLeaving) return Wr(i);
        const u = Po(i);
        if (!u) return Wr(i);
        const c = us(u, l, r, n);
        pr(u, c);
        const f = n.subTree,
          d = f && Po(f);
        let g = !1;
        const { getTransitionKey: v } = u.type;
        if (v) {
          const E = v();
          s === void 0 ? (s = E) : E !== s && ((s = E), (g = !0));
        }
        if (d && d.type !== Fe && (!We(u, d) || g)) {
          const E = us(d, l, r, n);
          if ((pr(d, E), a === 'out-in'))
            return (
              (r.isLeaving = !0),
              (E.afterLeave = () => {
                (r.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              Wr(i)
            );
          a === 'in-out' &&
            u.type !== Fe &&
            (E.delayLeave = (A, x, b) => {
              const y = vl(r, d);
              (y[String(d.key)] = d),
                (A[pt] = () => {
                  x(), (A[pt] = void 0), delete c.delayedLeave;
                }),
                (c.delayedLeave = b);
            });
        }
        return i;
      };
    }
  },
  Qc = Jc;
function vl(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function us(e, t, n, r) {
  const {
      appear: s,
      mode: o,
      persisted: i = !1,
      onBeforeEnter: l,
      onEnter: a,
      onAfterEnter: u,
      onEnterCancelled: c,
      onBeforeLeave: f,
      onLeave: d,
      onAfterLeave: g,
      onLeaveCancelled: v,
      onBeforeAppear: E,
      onAppear: A,
      onAfterAppear: x,
      onAppearCancelled: b
    } = t,
    y = String(e.key),
    m = vl(n, e),
    T = (S, B) => {
      S && je(S, r, 9, B);
    },
    I = (S, B) => {
      const N = B[1];
      T(S, B), J(S) ? S.every(Q => Q.length <= 1) && N() : S.length <= 1 && N();
    },
    L = {
      mode: o,
      persisted: i,
      beforeEnter(S) {
        let B = l;
        if (!n.isMounted)
          if (s) B = E || l;
          else return;
        S[pt] && S[pt](!0);
        const N = m[y];
        N && We(e, N) && N.el[pt] && N.el[pt](), T(B, [S]);
      },
      enter(S) {
        let B = a,
          N = u,
          Q = c;
        if (!n.isMounted)
          if (s) (B = A || a), (N = x || u), (Q = b || c);
          else return;
        let M = !1;
        const z = (S[Zn] = ae => {
          M ||
            ((M = !0),
            ae ? T(Q, [S]) : T(N, [S]),
            L.delayedLeave && L.delayedLeave(),
            (S[Zn] = void 0));
        });
        B ? I(B, [S, z]) : z();
      },
      leave(S, B) {
        const N = String(e.key);
        if ((S[Zn] && S[Zn](!0), n.isUnmounting)) return B();
        T(f, [S]);
        let Q = !1;
        const M = (S[pt] = z => {
          Q ||
            ((Q = !0),
            B(),
            z ? T(v, [S]) : T(g, [S]),
            (S[pt] = void 0),
            m[N] === e && delete m[N]);
        });
        (m[N] = e), d ? I(d, [S, M]) : M();
      },
      clone(S) {
        return us(S, t, n, r);
      }
    };
  return L;
}
function Wr(e) {
  if (Fn(e)) return (e = st(e)), (e.children = null), e;
}
function Po(e) {
  return Fn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function pr(e, t) {
  e.shapeFlag & 6 && e.component
    ? pr(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function bl(e, t = !1, n) {
  let r = [],
    s = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
    i.type === Oe
      ? (i.patchFlag & 128 && s++, (r = r.concat(bl(i.children, t, l))))
      : (t || i.type !== Fe) && r.push(l != null ? st(i, { key: l }) : i);
  }
  if (s > 1) for (let o = 0; o < r.length; o++) r[o].patchFlag = -2;
  return r;
}
/*! #__NO_SIDE_EFFECTS__ */ function bt(e, t) {
  return X(e) ? (() => _e({ name: e.name }, t, { setup: e }))() : e;
}
const Jt = e => !!e.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */ function ko(e) {
  X(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: r,
    delay: s = 200,
    timeout: o,
    suspensible: i = !0,
    onError: l
  } = e;
  let a = null,
    u,
    c = 0;
  const f = () => (c++, (a = null), d()),
    d = () => {
      let g;
      return (
        a ||
        (g = a =
          t()
            .catch(v => {
              if (((v = v instanceof Error ? v : new Error(String(v))), l))
                return new Promise((E, A) => {
                  l(
                    v,
                    () => E(f()),
                    () => A(v),
                    c + 1
                  );
                });
              throw v;
            })
            .then(v =>
              g !== a && a
                ? a
                : (v &&
                    (v.__esModule || v[Symbol.toStringTag] === 'Module') &&
                    (v = v.default),
                  (u = v),
                  v)
            ))
      );
    };
  return bt({
    name: 'AsyncComponentWrapper',
    __asyncLoader: d,
    get __asyncResolved() {
      return u;
    },
    setup() {
      const g = ge;
      if (u) return () => qr(u, g);
      const v = b => {
        (a = null), ln(b, g, 13, !r);
      };
      if ((i && g.suspense) || en)
        return d()
          .then(b => () => qr(b, g))
          .catch(b => (v(b), () => (r ? re(r, { error: b }) : null)));
      const E = Ie(!1),
        A = Ie(),
        x = Ie(!!s);
      return (
        s &&
          setTimeout(() => {
            x.value = !1;
          }, s),
        o != null &&
          setTimeout(() => {
            if (!E.value && !A.value) {
              const b = new Error(`Async component timed out after ${o}ms.`);
              v(b), (A.value = b);
            }
          }, o),
        d()
          .then(() => {
            (E.value = !0),
              g.parent && Fn(g.parent.vnode) && Or(g.parent.update);
          })
          .catch(b => {
            v(b), (A.value = b);
          }),
        () => {
          if (E.value && u) return qr(u, g);
          if (A.value && r) return re(r, { error: A.value });
          if (n && !x.value) return re(n);
        }
      );
    }
  });
}
function qr(e, t) {
  const { ref: n, props: r, children: s, ce: o } = t.vnode,
    i = re(e, r, s);
  return (i.ref = n), (i.ce = o), delete t.vnode.ce, i;
}
const Fn = e => e.type.__isKeepAlive,
  Xc = {
    name: 'KeepAlive',
    __isKeepAlive: !0,
    props: {
      include: [String, RegExp, Array],
      exclude: [String, RegExp, Array],
      max: [String, Number]
    },
    setup(e, { slots: t }) {
      const n = Kn(),
        r = n.ctx;
      if (!r.renderer)
        return () => {
          const b = t.default && t.default();
          return b && b.length === 1 ? b[0] : b;
        };
      const s = new Map(),
        o = new Set();
      let i = null;
      const l = n.suspense,
        {
          renderer: {
            p: a,
            m: u,
            um: c,
            o: { createElement: f }
          }
        } = r,
        d = f('div');
      (r.activate = (b, y, m, T, I) => {
        const L = b.component;
        u(b, y, m, 0, l),
          a(L.vnode, b, y, m, L, l, T, b.slotScopeIds, I),
          ve(() => {
            (L.isDeactivated = !1), L.a && _n(L.a);
            const S = b.props && b.props.onVnodeMounted;
            S && Re(S, L.parent, b);
          }, l);
      }),
        (r.deactivate = b => {
          const y = b.component;
          u(b, d, null, 1, l),
            ve(() => {
              y.da && _n(y.da);
              const m = b.props && b.props.onVnodeUnmounted;
              m && Re(m, y.parent, b), (y.isDeactivated = !0);
            }, l);
        });
      function g(b) {
        Vr(b), c(b, n, l, !0);
      }
      function v(b) {
        s.forEach((y, m) => {
          const T = ms(y.type);
          T && (!b || !b(T)) && E(m);
        });
      }
      function E(b) {
        const y = s.get(b);
        !i || !We(y, i) ? g(y) : i && Vr(i), s.delete(b), o.delete(b);
      }
      zt(
        () => [e.include, e.exclude],
        ([b, y]) => {
          b && v(m => gn(b, m)), y && v(m => !gn(y, m));
        },
        { flush: 'post', deep: !0 }
      );
      let A = null;
      const x = () => {
        A != null && s.set(A, zr(n.subTree));
      };
      return (
        Bn(x),
        Tl(x),
        Dn(() => {
          s.forEach(b => {
            const { subTree: y, suspense: m } = n,
              T = zr(y);
            if (b.type === T.type && b.key === T.key) {
              Vr(T);
              const I = T.component.da;
              I && ve(I, m);
              return;
            }
            g(b);
          });
        }),
        () => {
          if (((A = null), !t.default)) return null;
          const b = t.default(),
            y = b[0];
          if (b.length > 1) return (i = null), b;
          if (!On(y) || (!(y.shapeFlag & 4) && !(y.shapeFlag & 128)))
            return (i = null), y;
          let m = zr(y);
          const T = m.type,
            I = ms(Jt(m) ? m.type.__asyncResolved || {} : T),
            { include: L, exclude: S, max: B } = e;
          if ((L && (!I || !gn(L, I))) || (S && I && gn(S, I)))
            return (i = m), y;
          const N = m.key == null ? T : m.key,
            Q = s.get(N);
          return (
            m.el && ((m = st(m)), y.shapeFlag & 128 && (y.ssContent = m)),
            (A = N),
            Q
              ? ((m.el = Q.el),
                (m.component = Q.component),
                m.transition && pr(m, m.transition),
                (m.shapeFlag |= 512),
                o.delete(N),
                o.add(N))
              : (o.add(N),
                B && o.size > parseInt(B, 10) && E(o.values().next().value)),
            (m.shapeFlag |= 256),
            (i = m),
            pl(y.type) ? y : m
          );
        }
      );
    }
  },
  Yc = Xc;
function gn(e, t) {
  return J(e)
    ? e.some(n => gn(n, t))
    : he(e)
    ? e.split(',').includes(t)
    : ja(e)
    ? e.test(t)
    : !1;
}
function wl(e, t) {
  Cl(e, 'a', t);
}
function El(e, t) {
  Cl(e, 'da', t);
}
function Cl(e, t, n = ge) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((Hr(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      Fn(s.parent.vnode) && Zc(r, t, n, s), (s = s.parent);
  }
}
function Zc(e, t, n, r) {
  const s = Hr(t, e, r, !0);
  Rl(() => {
    Ls(r[t], s);
  }, n);
}
function Vr(e) {
  (e.shapeFlag &= -257), (e.shapeFlag &= -513);
}
function zr(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function Hr(e, t, n = ge, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          sn(), Gt(n);
          const l = je(t, n, e, i);
          return Ot(), on(), l;
        });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const ot =
    e =>
    (t, n = ge) =>
      (!en || e === 'sp') && Hr(e, (...r) => t(...r), n),
  Gc = ot('bm'),
  Bn = ot('m'),
  eu = ot('bu'),
  Tl = ot('u'),
  Dn = ot('bum'),
  Rl = ot('um'),
  tu = ot('sp'),
  nu = ot('rtg'),
  ru = ot('rtc');
function xl(e, t = ge) {
  Hr('ec', e, t);
}
const fs = e => (e ? (Ul(e) ? Lr(e) || e.proxy : fs(e.parent)) : null),
  vn = _e(Object.create(null), {
    $: e => e,
    $el: e => e.vnode.el,
    $data: e => e.data,
    $props: e => e.props,
    $attrs: e => e.attrs,
    $slots: e => e.slots,
    $refs: e => e.refs,
    $parent: e => fs(e.parent),
    $root: e => fs(e.root),
    $emit: e => e.emit,
    $options: e => Qs(e),
    $forceUpdate: e => e.f || (e.f = () => Or(e.update)),
    $nextTick: e => e.n || (e.n = Ht.bind(e.proxy)),
    $watch: e => Vc.bind(e)
  }),
  Jr = (e, t) => e !== ue && !e.__isScriptSetup && ee(e, t),
  su = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: l,
        appContext: a
      } = e;
      let u;
      if (t[0] !== '$') {
        const g = i[t];
        if (g !== void 0)
          switch (g) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Jr(r, t)) return (i[t] = 1), r[t];
          if (s !== ue && ee(s, t)) return (i[t] = 2), s[t];
          if ((u = e.propsOptions[0]) && ee(u, t)) return (i[t] = 3), o[t];
          if (n !== ue && ee(n, t)) return (i[t] = 4), n[t];
          ds && (i[t] = 0);
        }
      }
      const c = vn[t];
      let f, d;
      if (c) return t === '$attrs' && ke(e, 'get', t), c(e);
      if ((f = l.__cssModules) && (f = f[t])) return f;
      if (n !== ue && ee(n, t)) return (i[t] = 4), n[t];
      if (((d = a.config.globalProperties), ee(d, t))) return d[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return Jr(s, t)
        ? ((s[t] = n), !0)
        : r !== ue && ee(r, t)
        ? ((r[t] = n), !0)
        : ee(e.props, t) || (t[0] === '$' && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o
        }
      },
      i
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== ue && ee(e, i)) ||
        Jr(t, i) ||
        ((l = o[0]) && ee(l, i)) ||
        ee(r, i) ||
        ee(vn, i) ||
        ee(s.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : ee(n, 'value') && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    }
  };
function Ao(e) {
  return J(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let ds = !0;
function ou(e) {
  const t = Qs(e),
    n = e.proxy,
    r = e.ctx;
  (ds = !1), t.beforeCreate && So(t.beforeCreate, e, 'bc');
  const {
    data: s,
    computed: o,
    methods: i,
    watch: l,
    provide: a,
    inject: u,
    created: c,
    beforeMount: f,
    mounted: d,
    beforeUpdate: g,
    updated: v,
    activated: E,
    deactivated: A,
    beforeDestroy: x,
    beforeUnmount: b,
    destroyed: y,
    unmounted: m,
    render: T,
    renderTracked: I,
    renderTriggered: L,
    errorCaptured: S,
    serverPrefetch: B,
    expose: N,
    inheritAttrs: Q,
    components: M,
    directives: z,
    filters: ae
  } = t;
  if ((u && iu(u, r, null), i))
    for (const Z in i) {
      const K = i[Z];
      X(K) && (r[Z] = K.bind(n));
    }
  if (s) {
    const Z = s.call(n, n);
    fe(Z) && (e.data = rt(Z));
  }
  if (((ds = !0), o))
    for (const Z in o) {
      const K = o[Z],
        Be = X(K) ? K.bind(n, n) : X(K.get) ? K.get.bind(n, n) : qe,
        lt = !X(K) && X(K.set) ? K.set.bind(n) : qe,
        Je = xe({ get: Be, set: lt });
      Object.defineProperty(r, Z, {
        enumerable: !0,
        configurable: !0,
        get: () => Je.value,
        set: Ce => (Je.value = Ce)
      });
    }
  if (l) for (const Z in l) Pl(l[Z], r, n, Z);
  if (a) {
    const Z = X(a) ? a.call(n) : a;
    Reflect.ownKeys(Z).forEach(K => {
      Qt(K, Z[K]);
    });
  }
  c && So(c, e, 'c');
  function U(Z, K) {
    J(K) ? K.forEach(Be => Z(Be.bind(n))) : K && Z(K.bind(n));
  }
  if (
    (U(Gc, f),
    U(Bn, d),
    U(eu, g),
    U(Tl, v),
    U(wl, E),
    U(El, A),
    U(xl, S),
    U(ru, I),
    U(nu, L),
    U(Dn, b),
    U(Rl, m),
    U(tu, B),
    J(N))
  )
    if (N.length) {
      const Z = e.exposed || (e.exposed = {});
      N.forEach(K => {
        Object.defineProperty(Z, K, {
          get: () => n[K],
          set: Be => (n[K] = Be)
        });
      });
    } else e.exposed || (e.exposed = {});
  T && e.render === qe && (e.render = T),
    Q != null && (e.inheritAttrs = Q),
    M && (e.components = M),
    z && (e.directives = z);
}
function iu(e, t, n = qe) {
  J(e) && (e = hs(e));
  for (const r in e) {
    const s = e[r];
    let o;
    fe(s)
      ? 'default' in s
        ? (o = Me(s.from || r, s.default, !0))
        : (o = Me(s.from || r))
      : (o = Me(s)),
      ye(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: i => (o.value = i)
          })
        : (t[r] = o);
  }
}
function So(e, t, n) {
  je(J(e) ? e.map(r => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Pl(e, t, n, r) {
  const s = r.includes('.') ? yl(n, r) : () => n[r];
  if (he(e)) {
    const o = t[e];
    X(o) && zt(s, o);
  } else if (X(e)) zt(s, e.bind(n));
  else if (fe(e))
    if (J(e)) e.forEach(o => Pl(o, t, n, r));
    else {
      const o = X(e.handler) ? e.handler.bind(n) : t[e.handler];
      X(o) && zt(s, o, e);
    }
}
function Qs(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i }
    } = e.appContext,
    l = o.get(t);
  let a;
  return (
    l
      ? (a = l)
      : !s.length && !n && !r
      ? (a = t)
      : ((a = {}), s.length && s.forEach(u => gr(a, u, i, !0)), gr(a, t, i)),
    fe(t) && o.set(t, a),
    a
  );
}
function gr(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && gr(e, o, n, !0), s && s.forEach(i => gr(e, i, n, !0));
  for (const i in t)
    if (!(r && i === 'expose')) {
      const l = lu[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const lu = {
  data: Oo,
  props: Io,
  emits: Io,
  methods: mn,
  computed: mn,
  beforeCreate: Ee,
  created: Ee,
  beforeMount: Ee,
  mounted: Ee,
  beforeUpdate: Ee,
  updated: Ee,
  beforeDestroy: Ee,
  beforeUnmount: Ee,
  destroyed: Ee,
  unmounted: Ee,
  activated: Ee,
  deactivated: Ee,
  errorCaptured: Ee,
  serverPrefetch: Ee,
  components: mn,
  directives: mn,
  watch: cu,
  provide: Oo,
  inject: au
};
function Oo(e, t) {
  return t
    ? e
      ? function () {
          return _e(
            X(e) ? e.call(this, this) : e,
            X(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function au(e, t) {
  return mn(hs(e), hs(t));
}
function hs(e) {
  if (J(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ee(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function mn(e, t) {
  return e ? _e(Object.create(null), e, t) : t;
}
function Io(e, t) {
  return e
    ? J(e) && J(t)
      ? [...new Set([...e, ...t])]
      : _e(Object.create(null), Ao(e), Ao(t ?? {}))
    : t;
}
function cu(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = _e(Object.create(null), e);
  for (const r in t) n[r] = Ee(e[r], t[r]);
  return n;
}
function kl() {
  return {
    app: null,
    config: {
      isNativeTag: $a,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  };
}
let uu = 0;
function fu(e, t) {
  return function (r, s = null) {
    X(r) || (r = _e({}, r)), s != null && !fe(s) && (s = null);
    const o = kl(),
      i = new WeakSet();
    let l = !1;
    const a = (o.app = {
      _uid: uu++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: Wl,
      get config() {
        return o.config;
      },
      set config(u) {},
      use(u, ...c) {
        return (
          i.has(u) ||
            (u && X(u.install)
              ? (i.add(u), u.install(a, ...c))
              : X(u) && (i.add(u), u(a, ...c))),
          a
        );
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), a;
      },
      component(u, c) {
        return c ? ((o.components[u] = c), a) : o.components[u];
      },
      directive(u, c) {
        return c ? ((o.directives[u] = c), a) : o.directives[u];
      },
      mount(u, c, f) {
        if (!l) {
          const d = re(r, s);
          return (
            (d.appContext = o),
            c && t ? t(d, u) : e(d, u, f),
            (l = !0),
            (a._container = u),
            (u.__vue_app__ = a),
            Lr(d.component) || d.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, a._container), delete a._container.__vue_app__);
      },
      provide(u, c) {
        return (o.provides[u] = c), a;
      },
      runWithContext(u) {
        Sn = a;
        try {
          return u();
        } finally {
          Sn = null;
        }
      }
    });
    return a;
  };
}
let Sn = null;
function Qt(e, t) {
  if (ge) {
    let n = ge.provides;
    const r = ge.parent && ge.parent.provides;
    r === n && (n = ge.provides = Object.create(r)), (n[e] = t);
  }
}
function Me(e, t, n = !1) {
  const r = ge || Pe;
  if (r || Sn) {
    const s = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : Sn._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && X(t) ? t.call(r && r.proxy) : t;
  }
}
function Al() {
  return !!(ge || Pe || Sn);
}
function du(e, t, n, r = !1) {
  const s = {},
    o = {};
  cr(o, $r, 1), (e.propsDefaults = Object.create(null)), Sl(e, t, s, o);
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
  n ? (e.props = r ? s : jn(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o);
}
function hu(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i }
    } = e,
    l = ne(s),
    [a] = e.propsOptions;
  let u = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const c = e.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let d = c[f];
        if (Ir(e.emitsOptions, d)) continue;
        const g = t[d];
        if (a)
          if (ee(o, d)) g !== o[d] && ((o[d] = g), (u = !0));
          else {
            const v = Ge(d);
            s[v] = ps(a, l, v, g, e, !1);
          }
        else g !== o[d] && ((o[d] = g), (u = !0));
      }
    }
  } else {
    Sl(e, t, s, o) && (u = !0);
    let c;
    for (const f in l)
      (!t || (!ee(t, f) && ((c = rn(f)) === f || !ee(t, c)))) &&
        (a
          ? n &&
            (n[f] !== void 0 || n[c] !== void 0) &&
            (s[f] = ps(a, l, f, void 0, e, !0))
          : delete s[f]);
    if (o !== l)
      for (const f in o) (!t || !ee(t, f)) && (delete o[f], (u = !0));
  }
  u && nt(e, 'set', '$attrs');
}
function Sl(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let a in t) {
      if (yn(a)) continue;
      const u = t[a];
      let c;
      s && ee(s, (c = Ge(a)))
        ? !o || !o.includes(c)
          ? (n[c] = u)
          : ((l || (l = {}))[c] = u)
        : Ir(e.emitsOptions, a) ||
          ((!(a in r) || u !== r[a]) && ((r[a] = u), (i = !0)));
    }
  if (o) {
    const a = ne(n),
      u = l || ue;
    for (let c = 0; c < o.length; c++) {
      const f = o[c];
      n[f] = ps(s, a, f, u[f], e, !ee(u, f));
    }
  }
  return i;
}
function ps(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const l = ee(i, 'default');
    if (l && r === void 0) {
      const a = i.default;
      if (i.type !== Function && !i.skipFactory && X(a)) {
        const { propsDefaults: u } = s;
        n in u ? (r = u[n]) : (Gt(s), (r = u[n] = a.call(null, t)), Ot());
      } else r = a;
    }
    i[0] &&
      (o && !l ? (r = !1) : i[1] && (r === '' || r === rn(n)) && (r = !0));
  }
  return r;
}
function Ol(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const o = e.props,
    i = {},
    l = [];
  let a = !1;
  if (!X(e)) {
    const c = f => {
      a = !0;
      const [d, g] = Ol(f, t, !0);
      _e(i, d), g && l.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  if (!o && !a) return fe(e) && r.set(e, Ut), Ut;
  if (J(o))
    for (let c = 0; c < o.length; c++) {
      const f = Ge(o[c]);
      Mo(f) && (i[f] = ue);
    }
  else if (o)
    for (const c in o) {
      const f = Ge(c);
      if (Mo(f)) {
        const d = o[c],
          g = (i[f] = J(d) || X(d) ? { type: d } : _e({}, d));
        if (g) {
          const v = Lo(Boolean, g.type),
            E = Lo(String, g.type);
          (g[0] = v > -1),
            (g[1] = E < 0 || v < E),
            (v > -1 || ee(g, 'default')) && l.push(f);
        }
      }
    }
  const u = [i, l];
  return fe(e) && r.set(e, u), u;
}
function Mo(e) {
  return e[0] !== '$';
}
function Ho(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? 'null' : '';
}
function $o(e, t) {
  return Ho(e) === Ho(t);
}
function Lo(e, t) {
  return J(t) ? t.findIndex(n => $o(n, e)) : X(t) && $o(t, e) ? 0 : -1;
}
const Il = e => e[0] === '_' || e === '$stable',
  Xs = e => (J(e) ? e.map($e) : [$e(e)]),
  pu = (e, t, n) => {
    if (t._n) return t;
    const r = ht((...s) => Xs(t(...s)), n);
    return (r._c = !1), r;
  },
  Ml = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (Il(s)) continue;
      const o = e[s];
      if (X(o)) t[s] = pu(s, o, r);
      else if (o != null) {
        const i = Xs(o);
        t[s] = () => i;
      }
    }
  },
  Hl = (e, t) => {
    const n = Xs(t);
    e.slots.default = () => n;
  },
  gu = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = ne(t)), cr(t, '_', n)) : Ml(t, (e.slots = {}));
    } else (e.slots = {}), t && Hl(e, t);
    cr(e.slots, $r, 1);
  },
  mu = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0,
      i = ue;
    if (r.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (_e(s, t), !n && l === 1 && delete s._)
        : ((o = !t.$stable), Ml(t, s)),
        (i = t);
    } else t && (Hl(e, t), (i = { default: 1 }));
    if (o) for (const l in s) !Il(l) && i[l] == null && delete s[l];
  };
function mr(e, t, n, r, s = !1) {
  if (J(e)) {
    e.forEach((d, g) => mr(d, t && (J(t) ? t[g] : t), n, r, s));
    return;
  }
  if (Jt(r) && !s) return;
  const o = r.shapeFlag & 4 ? Lr(r.component) || r.component.proxy : r.el,
    i = s ? null : o,
    { i: l, r: a } = e,
    u = t && t.r,
    c = l.refs === ue ? (l.refs = {}) : l.refs,
    f = l.setupState;
  if (
    (u != null &&
      u !== a &&
      (he(u)
        ? ((c[u] = null), ee(f, u) && (f[u] = null))
        : ye(u) && (u.value = null)),
    X(a))
  )
    _t(a, l, 12, [i, c]);
  else {
    const d = he(a),
      g = ye(a);
    if (d || g) {
      const v = () => {
        if (e.f) {
          const E = d ? (ee(f, a) ? f[a] : c[a]) : a.value;
          s
            ? J(E) && Ls(E, o)
            : J(E)
            ? E.includes(o) || E.push(o)
            : d
            ? ((c[a] = [o]), ee(f, a) && (f[a] = c[a]))
            : ((a.value = [o]), e.k && (c[e.k] = a.value));
        } else
          d
            ? ((c[a] = i), ee(f, a) && (f[a] = i))
            : g && ((a.value = i), e.k && (c[e.k] = i));
      };
      i ? ((v.id = -1), ve(v, n)) : v();
    }
  }
}
let ct = !1;
const Gn = e => /svg/.test(e.namespaceURI) && e.tagName !== 'foreignObject',
  er = e => e.nodeType === 8;
function yu(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: r,
        createText: s,
        nextSibling: o,
        parentNode: i,
        remove: l,
        insert: a,
        createComment: u
      }
    } = e,
    c = (y, m) => {
      if (!m.hasChildNodes()) {
        n(null, y, m), dr(), (m._vnode = y);
        return;
      }
      (ct = !1),
        f(m.firstChild, y, null, null, null),
        dr(),
        (m._vnode = y),
        ct && console.error('Hydration completed but contains mismatches.');
    },
    f = (y, m, T, I, L, S = !1) => {
      const B = er(y) && y.data === '[',
        N = () => E(y, m, T, I, L, B),
        { type: Q, ref: M, shapeFlag: z, patchFlag: ae } = m;
      let le = y.nodeType;
      (m.el = y), ae === -2 && ((S = !1), (m.dynamicChildren = null));
      let U = null;
      switch (Q) {
        case Yt:
          le !== 3
            ? m.children === ''
              ? (a((m.el = s('')), i(y), y), (U = y))
              : (U = N())
            : (y.data !== m.children && ((ct = !0), (y.data = m.children)),
              (U = o(y)));
          break;
        case Fe:
          b(y)
            ? ((U = o(y)), x((m.el = y.content.firstChild), y, T))
            : le !== 8 || B
            ? (U = N())
            : (U = o(y));
          break;
        case sr:
          if ((B && ((y = o(y)), (le = y.nodeType)), le === 1 || le === 3)) {
            U = y;
            const Z = !m.children.length;
            for (let K = 0; K < m.staticCount; K++)
              Z && (m.children += U.nodeType === 1 ? U.outerHTML : U.data),
                K === m.staticCount - 1 && (m.anchor = U),
                (U = o(U));
            return B ? o(U) : U;
          } else N();
          break;
        case Oe:
          B ? (U = v(y, m, T, I, L, S)) : (U = N());
          break;
        default:
          if (z & 1)
            (le !== 1 || m.type.toLowerCase() !== y.tagName.toLowerCase()) &&
            !b(y)
              ? (U = N())
              : (U = d(y, m, T, I, L, S));
          else if (z & 6) {
            m.slotScopeIds = L;
            const Z = i(y);
            if (
              (B
                ? (U = A(y))
                : er(y) && y.data === 'teleport start'
                ? (U = A(y, y.data, 'teleport end'))
                : (U = o(y)),
              t(m, Z, null, T, I, Gn(Z), S),
              Jt(m))
            ) {
              let K;
              B
                ? ((K = re(Oe)),
                  (K.anchor = U ? U.previousSibling : Z.lastChild))
                : (K = y.nodeType === 3 ? Ue('') : re('div')),
                (K.el = y),
                (m.component.subTree = K);
            }
          } else
            z & 64
              ? le !== 8
                ? (U = N())
                : (U = m.type.hydrate(y, m, T, I, L, S, e, g))
              : z & 128 &&
                (U = m.type.hydrate(y, m, T, I, Gn(i(y)), L, S, e, f));
      }
      return M != null && mr(M, null, I, m), U;
    },
    d = (y, m, T, I, L, S) => {
      S = S || !!m.dynamicChildren;
      const {
          type: B,
          props: N,
          patchFlag: Q,
          shapeFlag: M,
          dirs: z,
          transition: ae
        } = m,
        le = (B === 'input' && z) || B === 'option';
      if (le || Q !== -1) {
        if ((z && Ye(m, null, T, 'created'), N))
          if (le || !S || Q & 48)
            for (const K in N)
              ((le && K.endsWith('value')) || (Ln(K) && !yn(K))) &&
                r(y, K, null, N[K], !1, void 0, T);
          else N.onClick && r(y, 'onClick', null, N.onClick, !1, void 0, T);
        let U;
        (U = N && N.onVnodeBeforeMount) && Re(U, T, m);
        let Z = !1;
        if (b(y)) {
          Z = Ll(I, ae) && T && T.vnode.props && T.vnode.props.appear;
          const K = y.content.firstChild;
          Z && ae.beforeEnter(K), x(K, y, T), (m.el = y = K);
        }
        if (
          (z && Ye(m, null, T, 'beforeMount'),
          ((U = N && N.onVnodeMounted) || z || Z) &&
            ml(() => {
              U && Re(U, T, m),
                Z && ae.enter(y),
                z && Ye(m, null, T, 'mounted');
            }, I),
          M & 16 && !(N && (N.innerHTML || N.textContent)))
        ) {
          let K = g(y.firstChild, m, y, T, I, L, S);
          for (; K; ) {
            ct = !0;
            const Be = K;
            (K = K.nextSibling), l(Be);
          }
        } else
          M & 8 &&
            y.textContent !== m.children &&
            ((ct = !0), (y.textContent = m.children));
      }
      return y.nextSibling;
    },
    g = (y, m, T, I, L, S, B) => {
      B = B || !!m.dynamicChildren;
      const N = m.children,
        Q = N.length;
      for (let M = 0; M < Q; M++) {
        const z = B ? N[M] : (N[M] = $e(N[M]));
        if (y) y = f(y, z, I, L, S, B);
        else {
          if (z.type === Yt && !z.children) continue;
          (ct = !0), n(null, z, T, null, I, L, Gn(T), S);
        }
      }
      return y;
    },
    v = (y, m, T, I, L, S) => {
      const { slotScopeIds: B } = m;
      B && (L = L ? L.concat(B) : B);
      const N = i(y),
        Q = g(o(y), m, N, T, I, L, S);
      return Q && er(Q) && Q.data === ']'
        ? o((m.anchor = Q))
        : ((ct = !0), a((m.anchor = u(']')), N, Q), Q);
    },
    E = (y, m, T, I, L, S) => {
      if (((ct = !0), (m.el = null), S)) {
        const Q = A(y);
        for (;;) {
          const M = o(y);
          if (M && M !== Q) l(M);
          else break;
        }
      }
      const B = o(y),
        N = i(y);
      return l(y), n(null, m, N, B, T, I, Gn(N), L), B;
    },
    A = (y, m = '[', T = ']') => {
      let I = 0;
      for (; y; )
        if (((y = o(y)), y && er(y) && (y.data === m && I++, y.data === T))) {
          if (I === 0) return o(y);
          I--;
        }
      return y;
    },
    x = (y, m, T) => {
      const I = m.parentNode;
      I && I.replaceChild(y, m);
      let L = T;
      for (; L; )
        L.vnode.el === m && (L.vnode.el = L.subTree.el = y), (L = L.parent);
    },
    b = y => y.nodeType === 1 && y.tagName.toLowerCase() === 'template';
  return [c, f];
}
const ve = ml;
function _u(e) {
  return $l(e);
}
function vu(e) {
  return $l(e, yu);
}
function $l(e, t) {
  const n = ss();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: a,
      setText: u,
      setElementText: c,
      parentNode: f,
      nextSibling: d,
      setScopeId: g = qe,
      insertStaticContent: v
    } = e,
    E = (
      h,
      p,
      _,
      w = null,
      R = null,
      P = null,
      j = !1,
      O = null,
      H = !!p.dynamicChildren
    ) => {
      if (h === p) return;
      h && !We(h, p) && ((w = C(h)), Ce(h, R, P, !0), (h = null)),
        p.patchFlag === -2 && ((H = !1), (p.dynamicChildren = null));
      const { type: k, ref: q, shapeFlag: D } = p;
      switch (k) {
        case Yt:
          A(h, p, _, w);
          break;
        case Fe:
          x(h, p, _, w);
          break;
        case sr:
          h == null && b(p, _, w, j);
          break;
        case Oe:
          M(h, p, _, w, R, P, j, O, H);
          break;
        default:
          D & 1
            ? T(h, p, _, w, R, P, j, O, H)
            : D & 6
            ? z(h, p, _, w, R, P, j, O, H)
            : (D & 64 || D & 128) && k.process(h, p, _, w, R, P, j, O, H, $);
      }
      q != null && R && mr(q, h && h.ref, P, p || h, !p);
    },
    A = (h, p, _, w) => {
      if (h == null) r((p.el = l(p.children)), _, w);
      else {
        const R = (p.el = h.el);
        p.children !== h.children && u(R, p.children);
      }
    },
    x = (h, p, _, w) => {
      h == null ? r((p.el = a(p.children || '')), _, w) : (p.el = h.el);
    },
    b = (h, p, _, w) => {
      [h.el, h.anchor] = v(h.children, p, _, w, h.el, h.anchor);
    },
    y = ({ el: h, anchor: p }, _, w) => {
      let R;
      for (; h && h !== p; ) (R = d(h)), r(h, _, w), (h = R);
      r(p, _, w);
    },
    m = ({ el: h, anchor: p }) => {
      let _;
      for (; h && h !== p; ) (_ = d(h)), s(h), (h = _);
      s(p);
    },
    T = (h, p, _, w, R, P, j, O, H) => {
      (j = j || p.type === 'svg'),
        h == null ? I(p, _, w, R, P, j, O, H) : B(h, p, R, P, j, O, H);
    },
    I = (h, p, _, w, R, P, j, O) => {
      let H, k;
      const { type: q, props: D, shapeFlag: V, transition: Y, dirs: G } = h;
      if (
        ((H = h.el = i(h.type, P, D && D.is, D)),
        V & 8
          ? c(H, h.children)
          : V & 16 &&
            S(h.children, H, null, w, R, P && q !== 'foreignObject', j, O),
        G && Ye(h, null, w, 'created'),
        L(H, h, h.scopeId, j, w),
        D)
      ) {
        for (const ie in D)
          ie !== 'value' &&
            !yn(ie) &&
            o(H, ie, null, D[ie], P, h.children, w, R, be);
        'value' in D && o(H, 'value', null, D.value),
          (k = D.onVnodeBeforeMount) && Re(k, w, h);
      }
      G && Ye(h, null, w, 'beforeMount');
      const ce = Ll(R, Y);
      ce && Y.beforeEnter(H),
        r(H, p, _),
        ((k = D && D.onVnodeMounted) || ce || G) &&
          ve(() => {
            k && Re(k, w, h), ce && Y.enter(H), G && Ye(h, null, w, 'mounted');
          }, R);
    },
    L = (h, p, _, w, R) => {
      if ((_ && g(h, _), w)) for (let P = 0; P < w.length; P++) g(h, w[P]);
      if (R) {
        let P = R.subTree;
        if (p === P) {
          const j = R.vnode;
          L(h, j, j.scopeId, j.slotScopeIds, R.parent);
        }
      }
    },
    S = (h, p, _, w, R, P, j, O, H = 0) => {
      for (let k = H; k < h.length; k++) {
        const q = (h[k] = O ? gt(h[k]) : $e(h[k]));
        E(null, q, p, _, w, R, P, j, O);
      }
    },
    B = (h, p, _, w, R, P, j) => {
      const O = (p.el = h.el);
      let { patchFlag: H, dynamicChildren: k, dirs: q } = p;
      H |= h.patchFlag & 16;
      const D = h.props || ue,
        V = p.props || ue;
      let Y;
      _ && Et(_, !1),
        (Y = V.onVnodeBeforeUpdate) && Re(Y, _, p, h),
        q && Ye(p, h, _, 'beforeUpdate'),
        _ && Et(_, !0);
      const G = R && p.type !== 'foreignObject';
      if (
        (k
          ? N(h.dynamicChildren, k, O, _, w, G, P)
          : j || K(h, p, O, null, _, w, G, P, !1),
        H > 0)
      ) {
        if (H & 16) Q(O, p, D, V, _, w, R);
        else if (
          (H & 2 && D.class !== V.class && o(O, 'class', null, V.class, R),
          H & 4 && o(O, 'style', D.style, V.style, R),
          H & 8)
        ) {
          const ce = p.dynamicProps;
          for (let ie = 0; ie < ce.length; ie++) {
            const pe = ce[ie],
              De = D[pe],
              Nt = V[pe];
            (Nt !== De || pe === 'value') &&
              o(O, pe, De, Nt, R, h.children, _, w, be);
          }
        }
        H & 1 && h.children !== p.children && c(O, p.children);
      } else !j && k == null && Q(O, p, D, V, _, w, R);
      ((Y = V.onVnodeUpdated) || q) &&
        ve(() => {
          Y && Re(Y, _, p, h), q && Ye(p, h, _, 'updated');
        }, w);
    },
    N = (h, p, _, w, R, P, j) => {
      for (let O = 0; O < p.length; O++) {
        const H = h[O],
          k = p[O],
          q =
            H.el && (H.type === Oe || !We(H, k) || H.shapeFlag & 70)
              ? f(H.el)
              : _;
        E(H, k, q, null, w, R, P, j, !0);
      }
    },
    Q = (h, p, _, w, R, P, j) => {
      if (_ !== w) {
        if (_ !== ue)
          for (const O in _)
            !yn(O) && !(O in w) && o(h, O, _[O], null, j, p.children, R, P, be);
        for (const O in w) {
          if (yn(O)) continue;
          const H = w[O],
            k = _[O];
          H !== k && O !== 'value' && o(h, O, k, H, j, p.children, R, P, be);
        }
        'value' in w && o(h, 'value', _.value, w.value);
      }
    },
    M = (h, p, _, w, R, P, j, O, H) => {
      const k = (p.el = h ? h.el : l('')),
        q = (p.anchor = h ? h.anchor : l(''));
      let { patchFlag: D, dynamicChildren: V, slotScopeIds: Y } = p;
      Y && (O = O ? O.concat(Y) : Y),
        h == null
          ? (r(k, _, w), r(q, _, w), S(p.children, _, q, R, P, j, O, H))
          : D > 0 && D & 64 && V && h.dynamicChildren
          ? (N(h.dynamicChildren, V, _, R, P, j, O),
            (p.key != null || (R && p === R.subTree)) && Nl(h, p, !0))
          : K(h, p, _, q, R, P, j, O, H);
    },
    z = (h, p, _, w, R, P, j, O, H) => {
      (p.slotScopeIds = O),
        h == null
          ? p.shapeFlag & 512
            ? R.ctx.activate(p, _, w, j, H)
            : ae(p, _, w, R, P, j, H)
          : le(h, p, H);
    },
    ae = (h, p, _, w, R, P, j) => {
      const O = (h.component = xu(h, w, R));
      if ((Fn(h) && (O.ctx.renderer = $), Pu(O), O.asyncDep)) {
        if ((R && R.registerDep(O, U), !h.el)) {
          const H = (O.subTree = re(Fe));
          x(null, H, p, _);
        }
        return;
      }
      U(O, h, p, _, R, P, j);
    },
    le = (h, p, _) => {
      const w = (p.component = h.component);
      if (Lc(h, p, _))
        if (w.asyncDep && !w.asyncResolved) {
          Z(w, p, _);
          return;
        } else (w.next = p), Sc(w.update), w.update();
      else (p.el = h.el), (w.vnode = p);
    },
    U = (h, p, _, w, R, P, j) => {
      const O = () => {
          if (h.isMounted) {
            let { next: q, bu: D, u: V, parent: Y, vnode: G } = h,
              ce = q,
              ie;
            Et(h, !1),
              q ? ((q.el = G.el), Z(h, q, j)) : (q = G),
              D && _n(D),
              (ie = q.props && q.props.onVnodeBeforeUpdate) && Re(ie, Y, q, G),
              Et(h, !0);
            const pe = Kr(h),
              De = h.subTree;
            (h.subTree = pe),
              E(De, pe, f(De.el), C(De), h, R, P),
              (q.el = pe.el),
              ce === null && qs(h, pe.el),
              V && ve(V, R),
              (ie = q.props && q.props.onVnodeUpdated) &&
                ve(() => Re(ie, Y, q, G), R);
          } else {
            let q;
            const { el: D, props: V } = p,
              { bm: Y, m: G, parent: ce } = h,
              ie = Jt(p);
            if (
              (Et(h, !1),
              Y && _n(Y),
              !ie && (q = V && V.onVnodeBeforeMount) && Re(q, ce, p),
              Et(h, !0),
              D && se)
            ) {
              const pe = () => {
                (h.subTree = Kr(h)), se(D, h.subTree, h, R, null);
              };
              ie
                ? p.type.__asyncLoader().then(() => !h.isUnmounted && pe())
                : pe();
            } else {
              const pe = (h.subTree = Kr(h));
              E(null, pe, _, w, h, R, P), (p.el = pe.el);
            }
            if ((G && ve(G, R), !ie && (q = V && V.onVnodeMounted))) {
              const pe = p;
              ve(() => Re(q, ce, pe), R);
            }
            (p.shapeFlag & 256 ||
              (ce && Jt(ce.vnode) && ce.vnode.shapeFlag & 256)) &&
              h.a &&
              ve(h.a, R),
              (h.isMounted = !0),
              (p = _ = w = null);
          }
        },
        H = (h.effect = new Fs(O, () => Or(k), h.scope)),
        k = (h.update = () => H.run());
      (k.id = h.uid), Et(h, !0), k();
    },
    Z = (h, p, _) => {
      p.component = h;
      const w = h.vnode.props;
      (h.vnode = p),
        (h.next = null),
        hu(h, p.props, w, _),
        mu(h, p.children, _),
        sn(),
        Co(),
        on();
    },
    K = (h, p, _, w, R, P, j, O, H = !1) => {
      const k = h && h.children,
        q = h ? h.shapeFlag : 0,
        D = p.children,
        { patchFlag: V, shapeFlag: Y } = p;
      if (V > 0) {
        if (V & 128) {
          lt(k, D, _, w, R, P, j, O, H);
          return;
        } else if (V & 256) {
          Be(k, D, _, w, R, P, j, O, H);
          return;
        }
      }
      Y & 8
        ? (q & 16 && be(k, R, P), D !== k && c(_, D))
        : q & 16
        ? Y & 16
          ? lt(k, D, _, w, R, P, j, O, H)
          : be(k, R, P, !0)
        : (q & 8 && c(_, ''), Y & 16 && S(D, _, w, R, P, j, O, H));
    },
    Be = (h, p, _, w, R, P, j, O, H) => {
      (h = h || Ut), (p = p || Ut);
      const k = h.length,
        q = p.length,
        D = Math.min(k, q);
      let V;
      for (V = 0; V < D; V++) {
        const Y = (p[V] = H ? gt(p[V]) : $e(p[V]));
        E(h[V], Y, _, null, R, P, j, O, H);
      }
      k > q ? be(h, R, P, !0, !1, D) : S(p, _, w, R, P, j, O, H, D);
    },
    lt = (h, p, _, w, R, P, j, O, H) => {
      let k = 0;
      const q = p.length;
      let D = h.length - 1,
        V = q - 1;
      for (; k <= D && k <= V; ) {
        const Y = h[k],
          G = (p[k] = H ? gt(p[k]) : $e(p[k]));
        if (We(Y, G)) E(Y, G, _, null, R, P, j, O, H);
        else break;
        k++;
      }
      for (; k <= D && k <= V; ) {
        const Y = h[D],
          G = (p[V] = H ? gt(p[V]) : $e(p[V]));
        if (We(Y, G)) E(Y, G, _, null, R, P, j, O, H);
        else break;
        D--, V--;
      }
      if (k > D) {
        if (k <= V) {
          const Y = V + 1,
            G = Y < q ? p[Y].el : w;
          for (; k <= V; )
            E(null, (p[k] = H ? gt(p[k]) : $e(p[k])), _, G, R, P, j, O, H), k++;
        }
      } else if (k > V) for (; k <= D; ) Ce(h[k], R, P, !0), k++;
      else {
        const Y = k,
          G = k,
          ce = new Map();
        for (k = G; k <= V; k++) {
          const Ae = (p[k] = H ? gt(p[k]) : $e(p[k]));
          Ae.key != null && ce.set(Ae.key, k);
        }
        let ie,
          pe = 0;
        const De = V - G + 1;
        let Nt = !1,
          fo = 0;
        const un = new Array(De);
        for (k = 0; k < De; k++) un[k] = 0;
        for (k = Y; k <= D; k++) {
          const Ae = h[k];
          if (pe >= De) {
            Ce(Ae, R, P, !0);
            continue;
          }
          let Qe;
          if (Ae.key != null) Qe = ce.get(Ae.key);
          else
            for (ie = G; ie <= V; ie++)
              if (un[ie - G] === 0 && We(Ae, p[ie])) {
                Qe = ie;
                break;
              }
          Qe === void 0
            ? Ce(Ae, R, P, !0)
            : ((un[Qe - G] = k + 1),
              Qe >= fo ? (fo = Qe) : (Nt = !0),
              E(Ae, p[Qe], _, null, R, P, j, O, H),
              pe++);
        }
        const ho = Nt ? bu(un) : Ut;
        for (ie = ho.length - 1, k = De - 1; k >= 0; k--) {
          const Ae = G + k,
            Qe = p[Ae],
            po = Ae + 1 < q ? p[Ae + 1].el : w;
          un[k] === 0
            ? E(null, Qe, _, po, R, P, j, O, H)
            : Nt && (ie < 0 || k !== ho[ie] ? Je(Qe, _, po, 2) : ie--);
        }
      }
    },
    Je = (h, p, _, w, R = null) => {
      const { el: P, type: j, transition: O, children: H, shapeFlag: k } = h;
      if (k & 6) {
        Je(h.component.subTree, p, _, w);
        return;
      }
      if (k & 128) {
        h.suspense.move(p, _, w);
        return;
      }
      if (k & 64) {
        j.move(h, p, _, $);
        return;
      }
      if (j === Oe) {
        r(P, p, _);
        for (let D = 0; D < H.length; D++) Je(H[D], p, _, w);
        r(h.anchor, p, _);
        return;
      }
      if (j === sr) {
        y(h, p, _);
        return;
      }
      if (w !== 2 && k & 1 && O)
        if (w === 0) O.beforeEnter(P), r(P, p, _), ve(() => O.enter(P), R);
        else {
          const { leave: D, delayLeave: V, afterLeave: Y } = O,
            G = () => r(P, p, _),
            ce = () => {
              D(P, () => {
                G(), Y && Y();
              });
            };
          V ? V(P, G, ce) : ce();
        }
      else r(P, p, _);
    },
    Ce = (h, p, _, w = !1, R = !1) => {
      const {
        type: P,
        props: j,
        ref: O,
        children: H,
        dynamicChildren: k,
        shapeFlag: q,
        patchFlag: D,
        dirs: V
      } = h;
      if ((O != null && mr(O, null, _, h, !0), q & 256)) {
        p.ctx.deactivate(h);
        return;
      }
      const Y = q & 1 && V,
        G = !Jt(h);
      let ce;
      if ((G && (ce = j && j.onVnodeBeforeUnmount) && Re(ce, p, h), q & 6))
        qn(h.component, _, w);
      else {
        if (q & 128) {
          h.suspense.unmount(_, w);
          return;
        }
        Y && Ye(h, null, p, 'beforeUnmount'),
          q & 64
            ? h.type.remove(h, p, _, R, $, w)
            : k && (P !== Oe || (D > 0 && D & 64))
            ? be(k, p, _, !1, !0)
            : ((P === Oe && D & 384) || (!R && q & 16)) && be(H, p, _),
          w && $t(h);
      }
      ((G && (ce = j && j.onVnodeUnmounted)) || Y) &&
        ve(() => {
          ce && Re(ce, p, h), Y && Ye(h, null, p, 'unmounted');
        }, _);
    },
    $t = h => {
      const { type: p, el: _, anchor: w, transition: R } = h;
      if (p === Oe) {
        Lt(_, w);
        return;
      }
      if (p === sr) {
        m(h);
        return;
      }
      const P = () => {
        s(_), R && !R.persisted && R.afterLeave && R.afterLeave();
      };
      if (h.shapeFlag & 1 && R && !R.persisted) {
        const { leave: j, delayLeave: O } = R,
          H = () => j(_, P);
        O ? O(h.el, P, H) : H();
      } else P();
    },
    Lt = (h, p) => {
      let _;
      for (; h !== p; ) (_ = d(h)), s(h), (h = _);
      s(p);
    },
    qn = (h, p, _) => {
      const { bum: w, scope: R, update: P, subTree: j, um: O } = h;
      w && _n(w),
        R.stop(),
        P && ((P.active = !1), Ce(j, h, p, _)),
        O && ve(O, p),
        ve(() => {
          h.isUnmounted = !0;
        }, p),
        p &&
          p.pendingBranch &&
          !p.isUnmounted &&
          h.asyncDep &&
          !h.asyncResolved &&
          h.suspenseId === p.pendingId &&
          (p.deps--, p.deps === 0 && p.resolve());
    },
    be = (h, p, _, w = !1, R = !1, P = 0) => {
      for (let j = P; j < h.length; j++) Ce(h[j], p, _, w, R);
    },
    C = h =>
      h.shapeFlag & 6
        ? C(h.component.subTree)
        : h.shapeFlag & 128
        ? h.suspense.next()
        : d(h.anchor || h.el),
    F = (h, p, _) => {
      h == null
        ? p._vnode && Ce(p._vnode, null, null, !0)
        : E(p._vnode || null, h, p, null, null, null, _),
        Co(),
        dr(),
        (p._vnode = h);
    },
    $ = {
      p: E,
      um: Ce,
      m: Je,
      r: $t,
      mt: ae,
      mc: S,
      pc: K,
      pbc: N,
      n: C,
      o: e
    };
  let W, se;
  return t && ([W, se] = t($)), { render: F, hydrate: W, createApp: fu(F, W) };
}
function Et({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ll(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Nl(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (J(r) && J(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let l = s[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = s[o] = gt(s[o])), (l.el = i.el)),
        n || Nl(i, l)),
        l.type === Yt && (l.el = i.el);
    }
}
function bu(e) {
  const t = e.slice(),
    n = [0];
  let r, s, o, i, l;
  const a = e.length;
  for (r = 0; r < a; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((s = n[n.length - 1]), e[s] < u)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < u ? (o = l + 1) : (i = l);
      u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const wu = e => e.__isTeleport,
  Oe = Symbol.for('v-fgt'),
  Yt = Symbol.for('v-txt'),
  Fe = Symbol.for('v-cmt'),
  sr = Symbol.for('v-stc'),
  bn = [];
let Ne = null;
function Le(e = !1) {
  bn.push((Ne = e ? null : []));
}
function jl() {
  bn.pop(), (Ne = bn[bn.length - 1] || null);
}
let Zt = 1;
function No(e) {
  Zt += e;
}
function Fl(e) {
  return (
    (e.dynamicChildren = Zt > 0 ? Ne || Ut : null),
    jl(),
    Zt > 0 && Ne && Ne.push(e),
    e
  );
}
function Un(e, t, n, r, s, o) {
  return Fl(me(e, t, n, r, s, o, !0));
}
function Ft(e, t, n, r, s) {
  return Fl(re(e, t, n, r, s, !0));
}
function On(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function We(e, t) {
  return e.type === t.type && e.key === t.key;
}
const $r = '__vInternal',
  Bl = ({ key: e }) => e ?? null,
  or = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? he(e) || ye(e) || X(e)
        ? { i: Pe, r: e, k: t, f: !!n }
        : e
      : null
  );
function me(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === Oe ? 0 : 1,
  i = !1,
  l = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Bl(t),
    ref: t && or(t),
    scopeId: Mr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Pe
  };
  return (
    l
      ? (Ys(a, n), o & 128 && e.normalize(a))
      : n && (a.shapeFlag |= he(n) ? 8 : 16),
    Zt > 0 &&
      !i &&
      Ne &&
      (a.patchFlag > 0 || o & 6) &&
      a.patchFlag !== 32 &&
      Ne.push(a),
    a
  );
}
const re = Eu;
function Eu(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === dl) && (e = Fe), On(e))) {
    const l = st(e, t, !0);
    return (
      n && Ys(l, n),
      Zt > 0 &&
        !o &&
        Ne &&
        (l.shapeFlag & 6 ? (Ne[Ne.indexOf(e)] = l) : Ne.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((Ou(e) && (e = e.__vccOpts), t)) {
    t = Dl(t);
    let { class: l, style: a } = t;
    l && !he(l) && (t.class = Xt(l)),
      fe(a) && (nl(a) && !J(a) && (a = _e({}, a)), (t.style = Ar(a)));
  }
  const i = he(e) ? 1 : pl(e) ? 128 : wu(e) ? 64 : fe(e) ? 4 : X(e) ? 2 : 0;
  return me(e, t, n, r, s, i, o, !0);
}
function Dl(e) {
  return e ? (nl(e) || $r in e ? _e({}, e) : e) : null;
}
function st(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e,
    l = t ? Cu(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Bl(l),
    ref:
      t && t.ref ? (n && s ? (J(s) ? s.concat(or(t)) : [s, or(t)]) : or(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Oe ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && st(e.ssContent),
    ssFallback: e.ssFallback && st(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function Ue(e = ' ', t = 0) {
  return re(Yt, null, e, t);
}
function $e(e) {
  return e == null || typeof e == 'boolean'
    ? re(Fe)
    : J(e)
    ? re(Oe, null, e.slice())
    : typeof e == 'object'
    ? gt(e)
    : re(Yt, null, String(e));
}
function gt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : st(e);
}
function Ys(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (J(t)) n = 16;
  else if (typeof t == 'object')
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Ys(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !($r in t)
        ? (t._ctx = Pe)
        : s === 3 &&
          Pe &&
          (Pe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    X(t)
      ? ((t = { default: t, _ctx: Pe }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [Ue(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function Cu(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === 'class')
        t.class !== r.class && (t.class = Xt([t.class, r.class]));
      else if (s === 'style') t.style = Ar([t.style, r.style]);
      else if (Ln(s)) {
        const o = t[s],
          i = r[s];
        i &&
          o !== i &&
          !(J(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i);
      } else s !== '' && (t[s] = r[s]);
  }
  return t;
}
function Re(e, t, n, r = null) {
  je(e, t, 7, [n, r]);
}
const Tu = kl();
let Ru = 0;
function xu(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || Tu,
    o = {
      uid: Ru++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Ki(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ol(r, s),
      emitsOptions: fl(r, s),
      emit: null,
      emitted: null,
      propsDefaults: ue,
      inheritAttrs: r.inheritAttrs,
      ctx: ue,
      data: ue,
      props: ue,
      attrs: ue,
      slots: ue,
      refs: ue,
      setupState: ue,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Ic.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let ge = null;
const Kn = () => ge || Pe;
let Zs,
  jt,
  jo = '__VUE_INSTANCE_SETTERS__';
(jt = ss()[jo]) || (jt = ss()[jo] = []),
  jt.push(e => (ge = e)),
  (Zs = e => {
    jt.length > 1 ? jt.forEach(t => t(e)) : jt[0](e);
  });
const Gt = e => {
    Zs(e), e.scope.on();
  },
  Ot = () => {
    ge && ge.scope.off(), Zs(null);
  };
function Ul(e) {
  return e.vnode.shapeFlag & 4;
}
let en = !1;
function Pu(e, t = !1) {
  en = t;
  const { props: n, children: r } = e.vnode,
    s = Ul(e);
  du(e, n, s, t), gu(e, r);
  const o = s ? ku(e, t) : void 0;
  return (en = !1), o;
}
function ku(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = rl(new Proxy(e.ctx, su)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? Su(e) : null);
    Gt(e), sn();
    const o = _t(r, e, 0, [e.props, s]);
    if ((on(), Ot(), Ni(o))) {
      if ((o.then(Ot, Ot), t))
        return o
          .then(i => {
            gs(e, i, t);
          })
          .catch(i => {
            ln(i, e, 0);
          });
      e.asyncDep = o;
    } else gs(e, o, t);
  } else Kl(e, t);
}
function gs(e, t, n) {
  X(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : fe(t) && (e.setupState = ll(t)),
    Kl(e, n);
}
let Fo;
function Kl(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Fo && !r.render) {
      const s = r.template || Qs(e).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: a } = r,
          u = _e(_e({ isCustomElement: o, delimiters: l }, i), a);
        r.render = Fo(s, u);
      }
    }
    e.render = r.render || qe;
  }
  {
    Gt(e), sn();
    try {
      ou(e);
    } finally {
      on(), Ot();
    }
  }
}
function Au(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return ke(e, 'get', '$attrs'), t[n];
      }
    }))
  );
}
function Su(e) {
  const t = n => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Au(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Lr(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(ll(rl(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in vn) return vn[n](e);
        },
        has(t, n) {
          return n in t || n in vn;
        }
      }))
    );
}
function ms(e, t = !0) {
  return X(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Ou(e) {
  return X(e) && '__vccOpts' in e;
}
const xe = (e, t) => Pc(e, t, en);
function Ve(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? fe(t) && !J(t)
      ? On(t)
        ? re(e, null, [t])
        : re(e, t)
      : re(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && On(n) && (n = [n]),
      re(e, t, n));
}
const Iu = Symbol.for('v-scx'),
  Mu = () => Me(Iu),
  Wl = '3.3.8',
  Hu = 'http://www.w3.org/2000/svg',
  Pt = typeof document < 'u' ? document : null,
  Bo = Pt && Pt.createElement('template'),
  $u = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: e => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? Pt.createElementNS(Hu, e)
        : Pt.createElement(e, n ? { is: n } : void 0);
      return (
        e === 'select' &&
          r &&
          r.multiple != null &&
          s.setAttribute('multiple', r.multiple),
        s
      );
    },
    createText: e => Pt.createTextNode(e),
    createComment: e => Pt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => Pt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        Bo.innerHTML = r ? `<svg>${e}</svg>` : e;
        const l = Bo.content;
        if (r) {
          const a = l.firstChild;
          for (; a.firstChild; ) l.appendChild(a.firstChild);
          l.removeChild(a);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild
      ];
    }
  },
  ut = 'transition',
  fn = 'animation',
  In = Symbol('_vtc'),
  Gs = (e, { slots: t }) => Ve(Qc, Lu(e), t);
Gs.displayName = 'Transition';
const ql = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
Gs.props = _e({}, _l, ql);
const Ct = (e, t = []) => {
    J(e) ? e.forEach(n => n(...t)) : e && e(...t);
  },
  Do = e => (e ? (J(e) ? e.some(t => t.length > 1) : e.length > 1) : !1);
function Lu(e) {
  const t = {};
  for (const M in e) M in ql || (t[M] = e[M]);
  if (e.css === !1) return t;
  const {
      name: n = 'v',
      type: r,
      duration: s,
      enterFromClass: o = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: a = o,
      appearActiveClass: u = i,
      appearToClass: c = l,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: d = `${n}-leave-active`,
      leaveToClass: g = `${n}-leave-to`
    } = e,
    v = Nu(s),
    E = v && v[0],
    A = v && v[1],
    {
      onBeforeEnter: x,
      onEnter: b,
      onEnterCancelled: y,
      onLeave: m,
      onLeaveCancelled: T,
      onBeforeAppear: I = x,
      onAppear: L = b,
      onAppearCancelled: S = y
    } = t,
    B = (M, z, ae) => {
      Tt(M, z ? c : l), Tt(M, z ? u : i), ae && ae();
    },
    N = (M, z) => {
      (M._isLeaving = !1), Tt(M, f), Tt(M, g), Tt(M, d), z && z();
    },
    Q = M => (z, ae) => {
      const le = M ? L : b,
        U = () => B(z, M, ae);
      Ct(le, [z, U]),
        Uo(() => {
          Tt(z, M ? a : o), ft(z, M ? c : l), Do(le) || Ko(z, r, E, U);
        });
    };
  return _e(t, {
    onBeforeEnter(M) {
      Ct(x, [M]), ft(M, o), ft(M, i);
    },
    onBeforeAppear(M) {
      Ct(I, [M]), ft(M, a), ft(M, u);
    },
    onEnter: Q(!1),
    onAppear: Q(!0),
    onLeave(M, z) {
      M._isLeaving = !0;
      const ae = () => N(M, z);
      ft(M, f),
        Bu(),
        ft(M, d),
        Uo(() => {
          M._isLeaving && (Tt(M, f), ft(M, g), Do(m) || Ko(M, r, A, ae));
        }),
        Ct(m, [M, ae]);
    },
    onEnterCancelled(M) {
      B(M, !1), Ct(y, [M]);
    },
    onAppearCancelled(M) {
      B(M, !0), Ct(S, [M]);
    },
    onLeaveCancelled(M) {
      N(M), Ct(T, [M]);
    }
  });
}
function Nu(e) {
  if (e == null) return null;
  if (fe(e)) return [Qr(e.enter), Qr(e.leave)];
  {
    const t = Qr(e);
    return [t, t];
  }
}
function Qr(e) {
  return Bi(e);
}
function ft(e, t) {
  t.split(/\s+/).forEach(n => n && e.classList.add(n)),
    (e[In] || (e[In] = new Set())).add(t);
}
function Tt(e, t) {
  t.split(/\s+/).forEach(r => r && e.classList.remove(r));
  const n = e[In];
  n && (n.delete(t), n.size || (e[In] = void 0));
}
function Uo(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let ju = 0;
function Ko(e, t, n, r) {
  const s = (e._endId = ++ju),
    o = () => {
      s === e._endId && r();
    };
  if (n) return setTimeout(o, n);
  const { type: i, timeout: l, propCount: a } = Fu(e, t);
  if (!i) return r();
  const u = i + 'end';
  let c = 0;
  const f = () => {
      e.removeEventListener(u, d), o();
    },
    d = g => {
      g.target === e && ++c >= a && f();
    };
  setTimeout(() => {
    c < a && f();
  }, l + 1),
    e.addEventListener(u, d);
}
function Fu(e, t) {
  const n = window.getComputedStyle(e),
    r = v => (n[v] || '').split(', '),
    s = r(`${ut}Delay`),
    o = r(`${ut}Duration`),
    i = Wo(s, o),
    l = r(`${fn}Delay`),
    a = r(`${fn}Duration`),
    u = Wo(l, a);
  let c = null,
    f = 0,
    d = 0;
  t === ut
    ? i > 0 && ((c = ut), (f = i), (d = o.length))
    : t === fn
    ? u > 0 && ((c = fn), (f = u), (d = a.length))
    : ((f = Math.max(i, u)),
      (c = f > 0 ? (i > u ? ut : fn) : null),
      (d = c ? (c === ut ? o.length : a.length) : 0));
  const g =
    c === ut && /\b(transform|all)(,|$)/.test(r(`${ut}Property`).toString());
  return { type: c, timeout: f, propCount: d, hasTransform: g };
}
function Wo(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => qo(n) + qo(e[r])));
}
function qo(e) {
  return e === 'auto' ? 0 : Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function Bu() {
  return document.body.offsetHeight;
}
function Du(e, t, n) {
  const r = e[In];
  r && (t = (t ? [t, ...r] : [...r]).join(' ')),
    t == null
      ? e.removeAttribute('class')
      : n
      ? e.setAttribute('class', t)
      : (e.className = t);
}
const eo = Symbol('_vod'),
  zg = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e[eo] = e.style.display === 'none' ? '' : e.style.display),
        n && t ? n.beforeEnter(e) : dn(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), dn(e, !0), r.enter(e))
            : r.leave(e, () => {
                dn(e, !1);
              })
          : dn(e, t));
    },
    beforeUnmount(e, { value: t }) {
      dn(e, t);
    }
  };
function dn(e, t) {
  e.style.display = t ? e[eo] : 'none';
}
function Uu(e, t, n) {
  const r = e.style,
    s = he(n);
  if (n && !s) {
    if (t && !he(t)) for (const o in t) n[o] == null && ys(r, o, '');
    for (const o in n) ys(r, o, n[o]);
  } else {
    const o = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute('style'),
      eo in e && (r.display = o);
  }
}
const Vo = /\s*!important$/;
function ys(e, t, n) {
  if (J(n)) n.forEach(r => ys(e, t, r));
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
  else {
    const r = Ku(e, t);
    Vo.test(n)
      ? e.setProperty(rn(r), n.replace(Vo, ''), 'important')
      : (e[r] = n);
  }
}
const zo = ['Webkit', 'Moz', 'ms'],
  Xr = {};
function Ku(e, t) {
  const n = Xr[t];
  if (n) return n;
  let r = Ge(t);
  if (r !== 'filter' && r in e) return (Xr[t] = r);
  r = kr(r);
  for (let s = 0; s < zo.length; s++) {
    const o = zo[s] + r;
    if (o in e) return (Xr[t] = o);
  }
  return t;
}
const Jo = 'http://www.w3.org/1999/xlink';
function Wu(e, t, n, r, s) {
  if (r && t.startsWith('xlink:'))
    n == null
      ? e.removeAttributeNS(Jo, t.slice(6, t.length))
      : e.setAttributeNS(Jo, t, n);
  else {
    const o = Qa(t);
    n == null || (o && !Di(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? '' : n);
  }
}
function qu(e, t, n, r, s, o, i) {
  if (t === 'innerHTML' || t === 'textContent') {
    r && i(r, s, o), (e[t] = n ?? '');
    return;
  }
  const l = e.tagName;
  if (t === 'value' && l !== 'PROGRESS' && !l.includes('-')) {
    e._value = n;
    const u = l === 'OPTION' ? e.getAttribute('value') : e.value,
      c = n ?? '';
    u !== c && (e.value = c), n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === '' || n == null) {
    const u = typeof e[t];
    u === 'boolean'
      ? (n = Di(n))
      : n == null && u === 'string'
      ? ((n = ''), (a = !0))
      : u === 'number' && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch {}
  a && e.removeAttribute(t);
}
function Vu(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function zu(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
const Qo = Symbol('_vei');
function Ju(e, t, n, r, s = null) {
  const o = e[Qo] || (e[Qo] = {}),
    i = o[t];
  if (r && i) i.value = r;
  else {
    const [l, a] = Qu(t);
    if (r) {
      const u = (o[t] = Zu(r, s));
      Vu(e, l, u, a);
    } else i && (zu(e, l, i, a), (o[t] = void 0));
  }
}
const Xo = /(?:Once|Passive|Capture)$/;
function Qu(e) {
  let t;
  if (Xo.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Xo)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : rn(e.slice(2)), t];
}
let Yr = 0;
const Xu = Promise.resolve(),
  Yu = () => Yr || (Xu.then(() => (Yr = 0)), (Yr = Date.now()));
function Zu(e, t) {
  const n = r => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    je(Gu(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = Yu()), n;
}
function Gu(e, t) {
  if (J(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map(r => s => !s._stopped && r && r(s))
    );
  } else return t;
}
const Yo = /^on[a-z]/,
  ef = (e, t, n, r, s = !1, o, i, l, a) => {
    t === 'class'
      ? Du(e, r, s)
      : t === 'style'
      ? Uu(e, n, r)
      : Ln(t)
      ? $s(t) || Ju(e, t, n, r, i)
      : (
          t[0] === '.'
            ? ((t = t.slice(1)), !0)
            : t[0] === '^'
            ? ((t = t.slice(1)), !1)
            : tf(e, t, r, s)
        )
      ? qu(e, t, r, o, i, l, a)
      : (t === 'true-value'
          ? (e._trueValue = r)
          : t === 'false-value' && (e._falseValue = r),
        Wu(e, t, r, s));
  };
function tf(e, t, n, r) {
  return r
    ? !!(
        t === 'innerHTML' ||
        t === 'textContent' ||
        (t in e && Yo.test(t) && X(n))
      )
    : t === 'spellcheck' ||
      t === 'draggable' ||
      t === 'translate' ||
      t === 'form' ||
      (t === 'list' && e.tagName === 'INPUT') ||
      (t === 'type' && e.tagName === 'TEXTAREA') ||
      (Yo.test(t) && he(n))
    ? !1
    : t in e;
}
const Vl = _e({ patchProp: ef }, $u);
let wn,
  Zo = !1;
function nf() {
  return wn || (wn = _u(Vl));
}
function rf() {
  return (wn = Zo ? wn : vu(Vl)), (Zo = !0), wn;
}
const sf = (...e) => {
    const t = nf().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = r => {
        const s = zl(r);
        if (!s) return;
        const o = t._component;
        !X(o) && !o.render && !o.template && (o.template = s.innerHTML),
          (s.innerHTML = '');
        const i = n(s, !1, s instanceof SVGElement);
        return (
          s instanceof Element &&
            (s.removeAttribute('v-cloak'), s.setAttribute('data-v-app', '')),
          i
        );
      }),
      t
    );
  },
  of = (...e) => {
    const t = rf().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = r => {
        const s = zl(r);
        if (s) return n(s, !0, s instanceof SVGElement);
      }),
      t
    );
  };
function zl(e) {
  return he(e) ? document.querySelector(e) : e;
}
const lf = /#/g,
  af = /&/g,
  cf = /=/g,
  to = /\+/g,
  uf = /%5e/gi,
  ff = /%60/gi,
  df = /%7c/gi,
  hf = /%20/gi;
function pf(e) {
  return encodeURI('' + e).replace(df, '|');
}
function _s(e) {
  return pf(typeof e == 'string' ? e : JSON.stringify(e))
    .replace(to, '%2B')
    .replace(hf, '+')
    .replace(lf, '%23')
    .replace(af, '%26')
    .replace(ff, '`')
    .replace(uf, '^');
}
function Zr(e) {
  return _s(e).replace(cf, '%3D');
}
function yr(e = '') {
  try {
    return decodeURIComponent('' + e);
  } catch {
    return '' + e;
  }
}
function gf(e) {
  return yr(e.replace(to, ' '));
}
function mf(e) {
  return yr(e.replace(to, ' '));
}
function Jl(e = '') {
  const t = {};
  e[0] === '?' && (e = e.slice(1));
  for (const n of e.split('&')) {
    const r = n.match(/([^=]+)=?(.*)/) || [];
    if (r.length < 2) continue;
    const s = gf(r[1]);
    if (s === '__proto__' || s === 'constructor') continue;
    const o = mf(r[2] || '');
    t[s] === void 0
      ? (t[s] = o)
      : Array.isArray(t[s])
      ? t[s].push(o)
      : (t[s] = [t[s], o]);
  }
  return t;
}
function yf(e, t) {
  return (
    (typeof t == 'number' || typeof t == 'boolean') && (t = String(t)),
    t
      ? Array.isArray(t)
        ? t.map(n => `${Zr(e)}=${_s(n)}`).join('&')
        : `${Zr(e)}=${_s(t)}`
      : Zr(e)
  );
}
function _f(e) {
  return Object.keys(e)
    .filter(t => e[t] !== void 0)
    .map(t => yf(t, e[t]))
    .filter(Boolean)
    .join('&');
}
const vf = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/,
  bf = /^[\s\w\0+.-]{2,}:([/\\]{2})?/,
  wf = /^([/\\]\s*){2,}[^/\\]/;
function an(e, t = {}) {
  return (
    typeof t == 'boolean' && (t = { acceptRelative: t }),
    t.strict ? vf.test(e) : bf.test(e) || (t.acceptRelative ? wf.test(e) : !1)
  );
}
const Ef = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
function Cf(e) {
  return !!e && Ef.test(e);
}
const Tf = /\/$|\/\?/;
function vs(e = '', t = !1) {
  return t ? Tf.test(e) : e.endsWith('/');
}
function no(e = '', t = !1) {
  if (!t) return (vs(e) ? e.slice(0, -1) : e) || '/';
  if (!vs(e, !0)) return e || '/';
  const [n, ...r] = e.split('?');
  return (n.slice(0, -1) || '/') + (r.length > 0 ? `?${r.join('?')}` : '');
}
function _r(e = '', t = !1) {
  if (!t) return e.endsWith('/') ? e : e + '/';
  if (vs(e, !0)) return e || '/';
  const [n, ...r] = e.split('?');
  return n + '/' + (r.length > 0 ? `?${r.join('?')}` : '');
}
function Rf(e = '') {
  return e.startsWith('/');
}
function Go(e = '') {
  return Rf(e) ? e : '/' + e;
}
function xf(e, t) {
  if (Xl(t) || an(e)) return e;
  const n = no(t);
  return e.startsWith(n) ? e : cn(n, e);
}
function ei(e, t) {
  if (Xl(t)) return e;
  const n = no(t);
  if (!e.startsWith(n)) return e;
  const r = e.slice(n.length);
  return r[0] === '/' ? r : '/' + r;
}
function Ql(e, t) {
  const n = Wn(e),
    r = { ...Jl(n.search), ...t };
  return (n.search = _f(r)), Sf(n);
}
function Xl(e) {
  return !e || e === '/';
}
function Pf(e) {
  return e && e !== '/';
}
const kf = /^\.?\//;
function cn(e, ...t) {
  let n = e || '';
  for (const r of t.filter(s => Pf(s)))
    if (n) {
      const s = r.replace(kf, '');
      n = _r(n) + s;
    } else n = r;
  return n;
}
function Af(e, t, n = {}) {
  return (
    n.trailingSlash || ((e = _r(e)), (t = _r(t))),
    n.leadingSlash || ((e = Go(e)), (t = Go(t))),
    n.encoding || ((e = yr(e)), (t = yr(t))),
    e === t
  );
}
function Wn(e = '', t) {
  const n = e.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/);
  if (n) {
    const [, f, d = ''] = n;
    return {
      protocol: f,
      pathname: d,
      href: f + d,
      auth: '',
      host: '',
      search: '',
      hash: ''
    };
  }
  if (!an(e, { acceptRelative: !0 })) return t ? Wn(t + e) : ti(e);
  const [, r = '', s, o = ''] =
      e
        .replace(/\\/g, '/')
        .match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [],
    [, i = '', l = ''] = o.match(/([^#/?]*)(.*)?/) || [],
    { pathname: a, search: u, hash: c } = ti(l.replace(/\/(?=[A-Za-z]:)/, ''));
  return {
    protocol: r,
    auth: s ? s.slice(0, Math.max(0, s.length - 1)) : '',
    host: i,
    pathname: a,
    search: u,
    hash: c
  };
}
function ti(e = '') {
  const [t = '', n = '', r = ''] = (
    e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []
  ).splice(1);
  return { pathname: t, search: n, hash: r };
}
function Sf(e) {
  const t = e.pathname || '',
    n = e.search ? (e.search.startsWith('?') ? '' : '?') + e.search : '',
    r = e.hash || '',
    s = e.auth ? e.auth + '@' : '',
    o = e.host || '';
  return (e.protocol ? e.protocol + '//' : '') + s + o + t + n + r;
}
const Of = () => {
    var e;
    return (
      ((e = window == null ? void 0 : window.__NUXT__) == null
        ? void 0
        : e.config) || {}
    );
  },
  vr = Of().app,
  If = () => vr.baseURL,
  Mf = () => vr.buildAssetsDir,
  ro = (...e) => cn(Yl(), Mf(), ...e),
  Yl = (...e) => {
    const t = vr.cdnURL || vr.baseURL;
    return e.length ? cn(t, ...e) : t;
  };
(globalThis.__buildAssetsURL = ro), (globalThis.__publicAssetsURL = Yl);
const Hf =
    /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
  $f =
    /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
  Lf = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Nf(e, t) {
  if (
    e === '__proto__' ||
    (e === 'constructor' && t && typeof t == 'object' && 'prototype' in t)
  ) {
    jf(e);
    return;
  }
  return t;
}
function jf(e) {
  console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`);
}
function br(e, t = {}) {
  if (typeof e != 'string') return e;
  const n = e.trim();
  if (e[0] === '"' && e.at(-1) === '"' && !e.includes('\\'))
    return n.slice(1, -1);
  if (n.length <= 9) {
    const r = n.toLowerCase();
    if (r === 'true') return !0;
    if (r === 'false') return !1;
    if (r === 'undefined') return;
    if (r === 'null') return null;
    if (r === 'nan') return Number.NaN;
    if (r === 'infinity') return Number.POSITIVE_INFINITY;
    if (r === '-infinity') return Number.NEGATIVE_INFINITY;
  }
  if (!Lf.test(e)) {
    if (t.strict) throw new SyntaxError('[destr] Invalid JSON');
    return e;
  }
  try {
    if (Hf.test(e) || $f.test(e)) {
      if (t.strict) throw new Error('[destr] Possible prototype pollution');
      return JSON.parse(e, Nf);
    }
    return JSON.parse(e);
  } catch (r) {
    if (t.strict) throw r;
    return e;
  }
}
class Ff extends Error {
  constructor(t, n) {
    super(t, n),
      (this.name = 'FetchError'),
      n != null && n.cause && !this.cause && (this.cause = n.cause);
  }
}
function Bf(e) {
  var a, u, c, f, d;
  const t =
      ((a = e.error) == null ? void 0 : a.message) ||
      ((u = e.error) == null ? void 0 : u.toString()) ||
      '',
    n =
      ((c = e.request) == null ? void 0 : c.method) ||
      ((f = e.options) == null ? void 0 : f.method) ||
      'GET',
    r = ((d = e.request) == null ? void 0 : d.url) || String(e.request) || '/',
    s = `[${n}] ${JSON.stringify(r)}`,
    o = e.response
      ? `${e.response.status} ${e.response.statusText}`
      : '<no response>',
    i = `${s}: ${o}${t ? ` ${t}` : ''}`,
    l = new Ff(i, e.error ? { cause: e.error } : void 0);
  for (const g of ['request', 'options', 'response'])
    Object.defineProperty(l, g, {
      get() {
        return e[g];
      }
    });
  for (const [g, v] of [
    ['data', '_data'],
    ['status', 'status'],
    ['statusCode', 'status'],
    ['statusText', 'statusText'],
    ['statusMessage', 'statusText']
  ])
    Object.defineProperty(l, g, {
      get() {
        return e.response && e.response[v];
      }
    });
  return l;
}
const Df = new Set(Object.freeze(['PATCH', 'POST', 'PUT', 'DELETE']));
function ni(e = 'GET') {
  return Df.has(e.toUpperCase());
}
function Uf(e) {
  if (e === void 0) return !1;
  const t = typeof e;
  return t === 'string' || t === 'number' || t === 'boolean' || t === null
    ? !0
    : t !== 'object'
    ? !1
    : Array.isArray(e)
    ? !0
    : e.buffer
    ? !1
    : (e.constructor && e.constructor.name === 'Object') ||
      typeof e.toJSON == 'function';
}
const Kf = new Set([
    'image/svg',
    'application/xml',
    'application/xhtml',
    'application/html'
  ]),
  Wf = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function qf(e = '') {
  if (!e) return 'json';
  const t = e.split(';').shift() || '';
  return Wf.test(t)
    ? 'json'
    : Kf.has(t) || t.startsWith('text/')
    ? 'text'
    : 'blob';
}
function Vf(e, t, n = globalThis.Headers) {
  const r = { ...t, ...e };
  if (
    (t != null &&
      t.params &&
      e != null &&
      e.params &&
      (r.params = {
        ...(t == null ? void 0 : t.params),
        ...(e == null ? void 0 : e.params)
      }),
    t != null &&
      t.query &&
      e != null &&
      e.query &&
      (r.query = {
        ...(t == null ? void 0 : t.query),
        ...(e == null ? void 0 : e.query)
      }),
    t != null && t.headers && e != null && e.headers)
  ) {
    r.headers = new n((t == null ? void 0 : t.headers) || {});
    for (const [s, o] of new n((e == null ? void 0 : e.headers) || {}))
      r.headers.set(s, o);
  }
  return r;
}
const zf = new Set([408, 409, 425, 429, 500, 502, 503, 504]),
  Jf = new Set([101, 204, 205, 304]);
function Zl(e = {}) {
  const {
    fetch: t = globalThis.fetch,
    Headers: n = globalThis.Headers,
    AbortController: r = globalThis.AbortController
  } = e;
  async function s(l) {
    const a =
      (l.error && l.error.name === 'AbortError' && !l.options.timeout) || !1;
    if (l.options.retry !== !1 && !a) {
      let c;
      typeof l.options.retry == 'number'
        ? (c = l.options.retry)
        : (c = ni(l.options.method) ? 0 : 1);
      const f = (l.response && l.response.status) || 500;
      if (
        c > 0 &&
        (Array.isArray(l.options.retryStatusCodes)
          ? l.options.retryStatusCodes.includes(f)
          : zf.has(f))
      ) {
        const d = l.options.retryDelay || 0;
        return (
          d > 0 && (await new Promise(g => setTimeout(g, d))),
          o(l.request, {
            ...l.options,
            retry: c - 1,
            timeout: l.options.timeout
          })
        );
      }
    }
    const u = Bf(l);
    throw (Error.captureStackTrace && Error.captureStackTrace(u, o), u);
  }
  const o = async function (a, u = {}) {
      var d;
      const c = {
        request: a,
        options: Vf(u, e.defaults, n),
        response: void 0,
        error: void 0
      };
      if (
        ((c.options.method =
          (d = c.options.method) == null ? void 0 : d.toUpperCase()),
        c.options.onRequest && (await c.options.onRequest(c)),
        typeof c.request == 'string' &&
          (c.options.baseURL && (c.request = xf(c.request, c.options.baseURL)),
          (c.options.query || c.options.params) &&
            (c.request = Ql(c.request, {
              ...c.options.params,
              ...c.options.query
            }))),
        c.options.body &&
          ni(c.options.method) &&
          (Uf(c.options.body)
            ? ((c.options.body =
                typeof c.options.body == 'string'
                  ? c.options.body
                  : JSON.stringify(c.options.body)),
              (c.options.headers = new n(c.options.headers || {})),
              c.options.headers.has('content-type') ||
                c.options.headers.set('content-type', 'application/json'),
              c.options.headers.has('accept') ||
                c.options.headers.set('accept', 'application/json'))
            : (('pipeTo' in c.options.body &&
                typeof c.options.body.pipeTo == 'function') ||
                typeof c.options.body.pipe == 'function') &&
              ('duplex' in c.options || (c.options.duplex = 'half'))),
        !c.options.signal && c.options.timeout)
      ) {
        const g = new r();
        setTimeout(() => g.abort(), c.options.timeout),
          (c.options.signal = g.signal);
      }
      try {
        c.response = await t(c.request, c.options);
      } catch (g) {
        return (
          (c.error = g),
          c.options.onRequestError && (await c.options.onRequestError(c)),
          await s(c)
        );
      }
      if (
        c.response.body &&
        !Jf.has(c.response.status) &&
        c.options.method !== 'HEAD'
      ) {
        const g =
          (c.options.parseResponse ? 'json' : c.options.responseType) ||
          qf(c.response.headers.get('content-type') || '');
        switch (g) {
          case 'json': {
            const v = await c.response.text(),
              E = c.options.parseResponse || br;
            c.response._data = E(v);
            break;
          }
          case 'stream': {
            c.response._data = c.response.body;
            break;
          }
          default:
            c.response._data = await c.response[g]();
        }
      }
      return (
        c.options.onResponse && (await c.options.onResponse(c)),
        !c.options.ignoreResponseError &&
        c.response.status >= 400 &&
        c.response.status < 600
          ? (c.options.onResponseError && (await c.options.onResponseError(c)),
            await s(c))
          : c.response
      );
    },
    i = async function (a, u) {
      return (await o(a, u))._data;
    };
  return (
    (i.raw = o),
    (i.native = (...l) => t(...l)),
    (i.create = (l = {}) => Zl({ ...e, defaults: { ...e.defaults, ...l } })),
    i
  );
}
const so = (function () {
    if (typeof globalThis < 'u') return globalThis;
    if (typeof self < 'u') return self;
    if (typeof window < 'u') return window;
    if (typeof global < 'u') return global;
    throw new Error('unable to locate global object');
  })(),
  Qf =
    so.fetch ||
    (() =>
      Promise.reject(new Error('[ofetch] global.fetch is not supported!'))),
  Xf = so.Headers,
  Yf = so.AbortController,
  Zf = Zl({ fetch: Qf, Headers: Xf, AbortController: Yf }),
  Gf = Zf;
globalThis.$fetch || (globalThis.$fetch = Gf.create({ baseURL: If() }));
function bs(e, t = {}, n) {
  for (const r in e) {
    const s = e[r],
      o = n ? `${n}:${r}` : r;
    typeof s == 'object' && s !== null
      ? bs(s, t, o)
      : typeof s == 'function' && (t[o] = s);
  }
  return t;
}
const ed = { run: e => e() },
  td = () => ed,
  Gl = typeof console.createTask < 'u' ? console.createTask : td;
function nd(e, t) {
  const n = t.shift(),
    r = Gl(n);
  return e.reduce(
    (s, o) => s.then(() => r.run(() => o(...t))),
    Promise.resolve()
  );
}
function rd(e, t) {
  const n = t.shift(),
    r = Gl(n);
  return Promise.all(e.map(s => r.run(() => s(...t))));
}
function Gr(e, t) {
  for (const n of [...e]) n(t);
}
class sd {
  constructor() {
    (this._hooks = {}),
      (this._before = void 0),
      (this._after = void 0),
      (this._deprecatedMessages = void 0),
      (this._deprecatedHooks = {}),
      (this.hook = this.hook.bind(this)),
      (this.callHook = this.callHook.bind(this)),
      (this.callHookWith = this.callHookWith.bind(this));
  }
  hook(t, n, r = {}) {
    if (!t || typeof n != 'function') return () => {};
    const s = t;
    let o;
    for (; this._deprecatedHooks[t]; )
      (o = this._deprecatedHooks[t]), (t = o.to);
    if (o && !r.allowDeprecated) {
      let i = o.message;
      i ||
        (i =
          `${s} hook has been deprecated` +
          (o.to ? `, please use ${o.to}` : '')),
        this._deprecatedMessages || (this._deprecatedMessages = new Set()),
        this._deprecatedMessages.has(i) ||
          (console.warn(i), this._deprecatedMessages.add(i));
    }
    if (!n.name)
      try {
        Object.defineProperty(n, 'name', {
          get: () => '_' + t.replace(/\W+/g, '_') + '_hook_cb',
          configurable: !0
        });
      } catch {}
    return (
      (this._hooks[t] = this._hooks[t] || []),
      this._hooks[t].push(n),
      () => {
        n && (this.removeHook(t, n), (n = void 0));
      }
    );
  }
  hookOnce(t, n) {
    let r,
      s = (...o) => (
        typeof r == 'function' && r(), (r = void 0), (s = void 0), n(...o)
      );
    return (r = this.hook(t, s)), r;
  }
  removeHook(t, n) {
    if (this._hooks[t]) {
      const r = this._hooks[t].indexOf(n);
      r !== -1 && this._hooks[t].splice(r, 1),
        this._hooks[t].length === 0 && delete this._hooks[t];
    }
  }
  deprecateHook(t, n) {
    this._deprecatedHooks[t] = typeof n == 'string' ? { to: n } : n;
    const r = this._hooks[t] || [];
    delete this._hooks[t];
    for (const s of r) this.hook(t, s);
  }
  deprecateHooks(t) {
    Object.assign(this._deprecatedHooks, t);
    for (const n in t) this.deprecateHook(n, t[n]);
  }
  addHooks(t) {
    const n = bs(t),
      r = Object.keys(n).map(s => this.hook(s, n[s]));
    return () => {
      for (const s of r.splice(0, r.length)) s();
    };
  }
  removeHooks(t) {
    const n = bs(t);
    for (const r in n) this.removeHook(r, n[r]);
  }
  removeAllHooks() {
    for (const t in this._hooks) delete this._hooks[t];
  }
  callHook(t, ...n) {
    return n.unshift(t), this.callHookWith(nd, t, ...n);
  }
  callHookParallel(t, ...n) {
    return n.unshift(t), this.callHookWith(rd, t, ...n);
  }
  callHookWith(t, n, ...r) {
    const s =
      this._before || this._after ? { name: n, args: r, context: {} } : void 0;
    this._before && Gr(this._before, s);
    const o = t(n in this._hooks ? [...this._hooks[n]] : [], r);
    return o instanceof Promise
      ? o.finally(() => {
          this._after && s && Gr(this._after, s);
        })
      : (this._after && s && Gr(this._after, s), o);
  }
  beforeEach(t) {
    return (
      (this._before = this._before || []),
      this._before.push(t),
      () => {
        if (this._before !== void 0) {
          const n = this._before.indexOf(t);
          n !== -1 && this._before.splice(n, 1);
        }
      }
    );
  }
  afterEach(t) {
    return (
      (this._after = this._after || []),
      this._after.push(t),
      () => {
        if (this._after !== void 0) {
          const n = this._after.indexOf(t);
          n !== -1 && this._after.splice(n, 1);
        }
      }
    );
  }
}
function ea() {
  return new sd();
}
function od(e = {}) {
  let t,
    n = !1;
  const r = i => {
    if (t && t !== i) throw new Error('Context conflict');
  };
  let s;
  if (e.asyncContext) {
    const i = e.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    i
      ? (s = new i())
      : console.warn('[unctx] `AsyncLocalStorage` is not provided.');
  }
  const o = () => {
    if (s && t === void 0) {
      const i = s.getStore();
      if (i !== void 0) return i;
    }
    return t;
  };
  return {
    use: () => {
      const i = o();
      if (i === void 0) throw new Error('Context is not available');
      return i;
    },
    tryUse: () => o(),
    set: (i, l) => {
      l || r(i), (t = i), (n = !0);
    },
    unset: () => {
      (t = void 0), (n = !1);
    },
    call: (i, l) => {
      r(i), (t = i);
      try {
        return s ? s.run(i, l) : l();
      } finally {
        n || (t = void 0);
      }
    },
    async callAsync(i, l) {
      t = i;
      const a = () => {
          t = i;
        },
        u = () => (t === i ? a : void 0);
      ws.add(u);
      try {
        const c = s ? s.run(i, l) : l();
        return n || (t = void 0), await c;
      } finally {
        ws.delete(u);
      }
    }
  };
}
function id(e = {}) {
  const t = {};
  return {
    get(n, r = {}) {
      return t[n] || (t[n] = od({ ...e, ...r })), t[n], t[n];
    }
  };
}
const wr =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
      ? self
      : typeof global < 'u'
      ? global
      : typeof window < 'u'
      ? window
      : {},
  ri = '__unctx__',
  ld = wr[ri] || (wr[ri] = id()),
  ad = (e, t = {}) => ld.get(e, t),
  si = '__unctx_async_handlers__',
  ws = wr[si] || (wr[si] = new Set());
function Mn(e) {
  const t = [];
  for (const s of ws) {
    const o = s();
    o && t.push(o);
  }
  const n = () => {
    for (const s of t) s();
  };
  let r = e();
  return (
    r &&
      typeof r == 'object' &&
      'catch' in r &&
      (r = r.catch(s => {
        throw (n(), s);
      })),
    [r, n]
  );
}
const ta = ad('nuxt-app', { asyncContext: !1 }),
  cd = '__nuxt_plugin';
function ud(e) {
  let t = 0;
  const n = {
    _scope: Xa(),
    provide: void 0,
    globalName: 'nuxt',
    versions: {
      get nuxt() {
        return '3.8.1';
      },
      get vue() {
        return n.vueApp.version;
      }
    },
    payload: rt({
      data: {},
      state: {},
      _errors: {},
      ...(window.__NUXT__ ?? {})
    }),
    static: { data: {} },
    runWithContext: s => n._scope.run(() => hd(n, s)),
    isHydrating: !0,
    deferHydration() {
      if (!n.isHydrating) return () => {};
      t++;
      let s = !1;
      return () => {
        if (!s && ((s = !0), t--, t === 0))
          return (n.isHydrating = !1), n.callHook('app:suspense:resolve');
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    _payloadRevivers: {},
    ...e
  };
  (n.hooks = ea()),
    (n.hook = n.hooks.hook),
    (n.callHook = n.hooks.callHook),
    (n.provide = (s, o) => {
      const i = '$' + s;
      tr(n, i, o), tr(n.vueApp.config.globalProperties, i, o);
    }),
    tr(n.vueApp, '$nuxt', n),
    tr(n.vueApp.config.globalProperties, '$nuxt', n);
  {
    window.addEventListener('nuxt.preloadError', o => {
      n.callHook('app:chunkError', { error: o.payload });
    }),
      (window.useNuxtApp = window.useNuxtApp || de);
    const s = n.hook('app:error', (...o) => {
      console.error('[nuxt] error caught during app initialization', ...o);
    });
    n.hook('app:mounted', s);
  }
  const r = rt(n.payload.config);
  return n.provide('config', r), n;
}
async function fd(e, t) {
  if ((t.hooks && e.hooks.addHooks(t.hooks), typeof t == 'function')) {
    const { provide: n } = (await e.runWithContext(() => t(e))) || {};
    if (n && typeof n == 'object') for (const r in n) e.provide(r, n[r]);
  }
}
async function dd(e, t) {
  const n = [],
    r = [];
  for (const s of t) {
    const o = fd(e, s);
    s.parallel ? n.push(o.catch(i => r.push(i))) : await o;
  }
  if ((await Promise.all(n), r.length)) throw r[0];
}
/*! @__NO_SIDE_EFFECTS__ */ function wt(e) {
  return typeof e == 'function'
    ? e
    : (delete e.name, Object.assign(e.setup || (() => {}), e, { [cd]: !0 }));
}
function hd(e, t, n) {
  const r = () => (n ? t(...n) : t());
  return ta.set(e), e.vueApp.runWithContext(r);
}
/*! @__NO_SIDE_EFFECTS__ */ function de() {
  var t;
  let e;
  if (
    (Al() && (e = (t = Kn()) == null ? void 0 : t.appContext.app.$nuxt),
    (e = e || ta.tryUse()),
    !e)
  )
    throw new Error('[nuxt] instance unavailable');
  return e;
}
/*! @__NO_SIDE_EFFECTS__ */ function Nr() {
  return de().$config;
}
function tr(e, t, n) {
  Object.defineProperty(e, t, { get: () => n });
}
const pd = 'modulepreload',
  gd = function (e, t) {
    return e[0] === '.' ? new URL(e, t).href : e;
  },
  oi = {},
  md = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const s = document.getElementsByTagName('link');
    return Promise.all(
      n.map(o => {
        if (((o = gd(o, r)), o in oi)) return;
        oi[o] = !0;
        const i = o.endsWith('.css'),
          l = i ? '[rel="stylesheet"]' : '';
        if (!!r)
          for (let c = s.length - 1; c >= 0; c--) {
            const f = s[c];
            if (f.href === o && (!i || f.rel === 'stylesheet')) return;
          }
        else if (document.querySelector(`link[href="${o}"]${l}`)) return;
        const u = document.createElement('link');
        if (
          ((u.rel = i ? 'stylesheet' : pd),
          i || ((u.as = 'script'), (u.crossOrigin = '')),
          (u.href = o),
          document.head.appendChild(u),
          i)
        )
          return new Promise((c, f) => {
            u.addEventListener('load', c),
              u.addEventListener('error', () =>
                f(new Error(`Unable to preload CSS for ${o}`))
              );
          });
      })
    )
      .then(() => t())
      .catch(o => {
        const i = new Event('vite:preloadError', { cancelable: !0 });
        if (((i.payload = o), window.dispatchEvent(i), !i.defaultPrevented))
          throw o;
      });
  },
  kt = (...e) =>
    md(...e).catch(t => {
      const n = new Event('nuxt.preloadError');
      throw ((n.payload = t), window.dispatchEvent(n), t);
    }),
  yd = -1,
  _d = -2,
  vd = -3,
  bd = -4,
  wd = -5,
  Ed = -6;
function Cd(e, t) {
  return Td(JSON.parse(e), t);
}
function Td(e, t) {
  if (typeof e == 'number') return s(e, !0);
  if (!Array.isArray(e) || e.length === 0) throw new Error('Invalid input');
  const n = e,
    r = Array(n.length);
  function s(o, i = !1) {
    if (o === yd) return;
    if (o === vd) return NaN;
    if (o === bd) return 1 / 0;
    if (o === wd) return -1 / 0;
    if (o === Ed) return -0;
    if (i) throw new Error('Invalid input');
    if (o in r) return r[o];
    const l = n[o];
    if (!l || typeof l != 'object') r[o] = l;
    else if (Array.isArray(l))
      if (typeof l[0] == 'string') {
        const a = l[0],
          u = t == null ? void 0 : t[a];
        if (u) return (r[o] = u(s(l[1])));
        switch (a) {
          case 'Date':
            r[o] = new Date(l[1]);
            break;
          case 'Set':
            const c = new Set();
            r[o] = c;
            for (let g = 1; g < l.length; g += 1) c.add(s(l[g]));
            break;
          case 'Map':
            const f = new Map();
            r[o] = f;
            for (let g = 1; g < l.length; g += 2) f.set(s(l[g]), s(l[g + 1]));
            break;
          case 'RegExp':
            r[o] = new RegExp(l[1], l[2]);
            break;
          case 'Object':
            r[o] = Object(l[1]);
            break;
          case 'BigInt':
            r[o] = BigInt(l[1]);
            break;
          case 'null':
            const d = Object.create(null);
            r[o] = d;
            for (let g = 1; g < l.length; g += 2) d[l[g]] = s(l[g + 1]);
            break;
          default:
            throw new Error(`Unknown type ${a}`);
        }
      } else {
        const a = new Array(l.length);
        r[o] = a;
        for (let u = 0; u < l.length; u += 1) {
          const c = l[u];
          c !== _d && (a[u] = s(c));
        }
      }
    else {
      const a = {};
      r[o] = a;
      for (const u in l) {
        const c = l[u];
        a[u] = s(c);
      }
    }
    return r[o];
  }
  return s(0);
}
function Rd(e) {
  return Array.isArray(e) ? e : [e];
}
const xd = ['title', 'titleTemplate', 'script', 'style', 'noscript'],
  ir = ['base', 'meta', 'link', 'style', 'script', 'noscript'],
  Pd = [
    'title',
    'titleTemplate',
    'templateParams',
    'base',
    'htmlAttrs',
    'bodyAttrs',
    'meta',
    'link',
    'style',
    'script',
    'noscript'
  ],
  kd = [
    'base',
    'title',
    'titleTemplate',
    'bodyAttrs',
    'htmlAttrs',
    'templateParams'
  ],
  na = [
    'tagPosition',
    'tagPriority',
    'tagDuplicateStrategy',
    'innerHTML',
    'textContent',
    'processTemplateParams'
  ],
  Ad = typeof window < 'u';
function oo(e) {
  let t = 9;
  for (let n = 0; n < e.length; ) t = Math.imul(t ^ e.charCodeAt(n++), 9 ** 9);
  return ((t ^ (t >>> 9)) + 65536).toString(16).substring(1, 8).toLowerCase();
}
function ii(e) {
  return (
    e._h ||
    oo(
      e._d
        ? e._d
        : `${e.tag}:${e.textContent || e.innerHTML || ''}:${Object.entries(
            e.props
          )
            .map(([t, n]) => `${t}:${String(n)}`)
            .join(',')}`
    )
  );
}
function ra(e, t) {
  const { props: n, tag: r } = e;
  if (kd.includes(r)) return r;
  if (r === 'link' && n.rel === 'canonical') return 'canonical';
  if (n.charset) return 'charset';
  const s = ['id'];
  r === 'meta' && s.push('name', 'property', 'http-equiv');
  for (const o of s)
    if (typeof n[o] < 'u') {
      const i = String(n[o]);
      return t && !t(i) ? !1 : `${r}:${o}:${i}`;
    }
  return !1;
}
function li(e, t) {
  return e == null ? t || null : typeof e == 'function' ? e(t) : e;
}
async function Sd(e, t, n) {
  const r = {
    tag: e,
    props: await sa(
      typeof t == 'object' && typeof t != 'function' && !(t instanceof Promise)
        ? { ...t }
        : {
            [['script', 'noscript', 'style'].includes(e)
              ? 'innerHTML'
              : 'textContent']: t
          },
      ['templateParams', 'titleTemplate'].includes(e)
    )
  };
  return (
    na.forEach(s => {
      const o = typeof r.props[s] < 'u' ? r.props[s] : n[s];
      typeof o < 'u' &&
        ((!['innerHTML', 'textContent'].includes(s) || xd.includes(r.tag)) &&
          (r[s] = o),
        delete r.props[s]);
    }),
    r.props.body && ((r.tagPosition = 'bodyClose'), delete r.props.body),
    r.props.children &&
      ((r.innerHTML = r.props.children), delete r.props.children),
    r.tag === 'script' &&
      (typeof r.innerHTML == 'object' &&
        ((r.innerHTML = JSON.stringify(r.innerHTML)),
        (r.props.type = r.props.type || 'application/json')),
      r.innerHTML &&
        ['application/ld+json', 'application/json'].includes(r.props.type) &&
        (r.innerHTML = r.innerHTML.replace(/</g, '\\u003C'))),
    Array.isArray(r.props.content)
      ? r.props.content.map(s => ({ ...r, props: { ...r.props, content: s } }))
      : r
  );
}
function Od(e) {
  return (
    typeof e == 'object' &&
      !Array.isArray(e) &&
      (e = Object.keys(e).filter(t => e[t])),
    (Array.isArray(e) ? e.join(' ') : e)
      .split(' ')
      .filter(t => t.trim())
      .filter(Boolean)
      .join(' ')
  );
}
async function sa(e, t) {
  for (const n of Object.keys(e)) {
    if (n === 'class') {
      e[n] = Od(e[n]);
      continue;
    }
    if (
      (e[n] instanceof Promise && (e[n] = await e[n]), !t && !na.includes(n))
    ) {
      const r = String(e[n]),
        s = n.startsWith('data-');
      r === 'true' || r === ''
        ? (e[n] = s ? 'true' : !0)
        : e[n] || (s && r === 'false' ? (e[n] = 'false') : delete e[n]);
    }
  }
  return e;
}
const Id = 10;
async function Md(e) {
  const t = [];
  return (
    Object.entries(e.resolvedInput)
      .filter(([n, r]) => typeof r < 'u' && Pd.includes(n))
      .forEach(([n, r]) => {
        const s = Rd(r);
        t.push(...s.map(o => Sd(n, o, e)).flat());
      }),
    (await Promise.all(t))
      .flat()
      .filter(Boolean)
      .map(
        (n, r) => (
          (n._e = e._i), e.mode && (n._m = e.mode), (n._p = (e._i << Id) + r), n
        )
      )
  );
}
const ai = { base: -10, title: 10 },
  ci = { critical: -80, high: -10, low: 20 };
function Er(e) {
  let t = 100;
  const n = e.tagPriority;
  return typeof n == 'number'
    ? n
    : (e.tag === 'meta'
        ? (e.props['http-equiv'] === 'content-security-policy' && (t = -30),
          e.props.charset && (t = -20),
          e.props.name === 'viewport' && (t = -15))
        : e.tag === 'link' && e.props.rel === 'preconnect'
        ? (t = 20)
        : e.tag in ai && (t = ai[e.tag]),
      typeof n == 'string' && n in ci ? t + ci[n] : t);
}
const Hd = [
    { prefix: 'before:', offset: -1 },
    { prefix: 'after:', offset: 1 }
  ],
  oa = ['onload', 'onerror', 'onabort', 'onprogress', 'onloadstart'],
  dt = '%separator';
function lr(e, t, n) {
  if (typeof e != 'string' || !e.includes('%')) return e;
  function r(i) {
    let l;
    return (
      ['s', 'pageTitle'].includes(i)
        ? (l = t.pageTitle)
        : i.includes('.')
        ? (l = i.split('.').reduce((a, u) => (a && a[u]) || void 0, t))
        : (l = t[i]),
      typeof l < 'u' ? (l || '').replace(/"/g, '\\"') : !1
    );
  }
  let s = e;
  try {
    s = decodeURI(e);
  } catch {}
  return (
    (s.match(/%(\w+\.+\w+)|%(\w+)/g) || [])
      .sort()
      .reverse()
      .forEach(i => {
        const l = r(i.slice(1));
        typeof l == 'string' &&
          (e = e
            .replace(new RegExp(`\\${i}(\\W|$)`, 'g'), (a, u) => `${l}${u}`)
            .trim());
      }),
    e.includes(dt) &&
      (e.endsWith(dt) && (e = e.slice(0, -dt.length).trim()),
      e.startsWith(dt) && (e = e.slice(dt.length).trim()),
      (e = e.replace(new RegExp(`\\${dt}\\s*\\${dt}`, 'g'), dt)),
      (e = lr(e, { separator: n }, n))),
    e
  );
}
async function $d(e) {
  const t = {
    tag: e.tagName.toLowerCase(),
    props: await sa(
      e
        .getAttributeNames()
        .reduce((n, r) => ({ ...n, [r]: e.getAttribute(r) }), {})
    ),
    innerHTML: e.innerHTML
  };
  return (t._d = ra(t)), t;
}
async function ia(e, t = {}) {
  var c;
  const n = t.document || e.resolvedOptions.document;
  if (!n) return;
  const r = { shouldRender: e.dirty, tags: [] };
  if ((await e.hooks.callHook('dom:beforeRender', r), !r.shouldRender)) return;
  const s = (await e.resolveTags()).map(f => ({
    tag: f,
    id: ir.includes(f.tag) ? ii(f) : f.tag,
    shouldRender: !0
  }));
  let o = e._dom;
  if (!o) {
    o = { elMap: { htmlAttrs: n.documentElement, bodyAttrs: n.body } };
    for (const f of ['body', 'head']) {
      const d = (c = n == null ? void 0 : n[f]) == null ? void 0 : c.children;
      for (const g of [...d].filter(v => ir.includes(v.tagName.toLowerCase())))
        o.elMap[g.getAttribute('data-hid') || ii(await $d(g))] = g;
    }
  }
  (o.pendingSideEffects = { ...(o.sideEffects || {}) }), (o.sideEffects = {});
  function i(f, d, g) {
    const v = `${f}:${d}`;
    (o.sideEffects[v] = g), delete o.pendingSideEffects[v];
  }
  function l({ id: f, $el: d, tag: g }) {
    const v = g.tag.endsWith('Attrs');
    (o.elMap[f] = d),
      v ||
        (['textContent', 'innerHTML'].forEach(E => {
          g[E] && g[E] !== d[E] && (d[E] = g[E]);
        }),
        i(f, 'el', () => {
          o.elMap[f].remove(), delete o.elMap[f];
        })),
      Object.entries(g.props).forEach(([E, A]) => {
        const x = `attr:${E}`;
        if (E === 'class')
          for (const b of (A || '').split(' ').filter(Boolean))
            v && i(f, `${x}:${b}`, () => d.classList.remove(b)),
              !d.classList.contains(b) && d.classList.add(b);
        else
          d.getAttribute(E) !== A &&
            d.setAttribute(E, A === !0 ? '' : String(A)),
            v && i(f, x, () => d.removeAttribute(E));
      });
  }
  const a = [],
    u = { bodyClose: void 0, bodyOpen: void 0, head: void 0 };
  for (const f of s) {
    const { tag: d, shouldRender: g, id: v } = f;
    if (g) {
      if (d.tag === 'title') {
        n.title = d.textContent;
        continue;
      }
      (f.$el = f.$el || o.elMap[v]),
        f.$el ? l(f) : ir.includes(d.tag) && a.push(f);
    }
  }
  for (const f of a) {
    const d = f.tag.tagPosition || 'head';
    (f.$el = n.createElement(f.tag.tag)),
      l(f),
      (u[d] = u[d] || n.createDocumentFragment()),
      u[d].appendChild(f.$el);
  }
  for (const f of s) await e.hooks.callHook('dom:renderTag', f, n, i);
  u.head && n.head.appendChild(u.head),
    u.bodyOpen && n.body.insertBefore(u.bodyOpen, n.body.firstChild),
    u.bodyClose && n.body.appendChild(u.bodyClose),
    Object.values(o.pendingSideEffects).forEach(f => f()),
    (e._dom = o),
    (e.dirty = !1),
    await e.hooks.callHook('dom:rendered', { renders: s });
}
async function Ld(e, t = {}) {
  const n = t.delayFn || (r => setTimeout(r, 10));
  return (e._domUpdatePromise =
    e._domUpdatePromise ||
    new Promise(r =>
      n(async () => {
        await ia(e, t), delete e._domUpdatePromise, r();
      })
    ));
}
function Nd(e) {
  return t => {
    var r, s;
    const n =
      ((s =
        (r = t.resolvedOptions.document) == null
          ? void 0
          : r.head.querySelector('script[id="unhead:payload"]')) == null
        ? void 0
        : s.innerHTML) || !1;
    return (
      n && t.push(JSON.parse(n)),
      {
        mode: 'client',
        hooks: {
          'entries:updated': function (o) {
            Ld(o, e);
          }
        }
      }
    );
  };
}
const jd = ['templateParams', 'htmlAttrs', 'bodyAttrs'],
  Fd = {
    hooks: {
      'tag:normalise': function ({ tag: e }) {
        ['hid', 'vmid', 'key'].forEach(r => {
          e.props[r] && ((e.key = e.props[r]), delete e.props[r]);
        });
        const n = ra(e) || (e.key ? `${e.tag}:${e.key}` : !1);
        n && (e._d = n);
      },
      'tags:resolve': function (e) {
        const t = {};
        e.tags.forEach(r => {
          const s = (r.key ? `${r.tag}:${r.key}` : r._d) || r._p,
            o = t[s];
          if (o) {
            let l = r == null ? void 0 : r.tagDuplicateStrategy;
            if ((!l && jd.includes(r.tag) && (l = 'merge'), l === 'merge')) {
              const a = o.props;
              ['class', 'style'].forEach(u => {
                r.props[u] &&
                  a[u] &&
                  (u === 'style' && !a[u].endsWith(';') && (a[u] += ';'),
                  (r.props[u] = `${a[u]} ${r.props[u]}`));
              }),
                (t[s].props = { ...a, ...r.props });
              return;
            } else if (r._e === o._e) {
              (o._duped = o._duped || []),
                (r._d = `${o._d}:${o._duped.length + 1}`),
                o._duped.push(r);
              return;
            } else if (Er(r) > Er(o)) return;
          }
          const i =
            Object.keys(r.props).length +
            (r.innerHTML ? 1 : 0) +
            (r.textContent ? 1 : 0);
          if (ir.includes(r.tag) && i === 0) {
            delete t[s];
            return;
          }
          t[s] = r;
        });
        const n = [];
        Object.values(t).forEach(r => {
          const s = r._duped;
          delete r._duped, n.push(r), s && n.push(...s);
        }),
          (e.tags = n),
          (e.tags = e.tags.filter(
            r =>
              !(
                r.tag === 'meta' &&
                (r.props.name || r.props.property) &&
                !r.props.content
              )
          ));
      }
    }
  },
  Bd = {
    mode: 'server',
    hooks: {
      'tags:resolve': function (e) {
        const t = {};
        e.tags
          .filter(
            n =>
              ['titleTemplate', 'templateParams', 'title'].includes(n.tag) &&
              n._m === 'server'
          )
          .forEach(n => {
            t[n.tag] = n.tag.startsWith('title') ? n.textContent : n.props;
          }),
          Object.keys(t).length &&
            e.tags.push({
              tag: 'script',
              innerHTML: JSON.stringify(t),
              props: { id: 'unhead:payload', type: 'application/json' }
            });
      }
    }
  },
  Dd = ['script', 'link', 'bodyAttrs'];
function Ud(e) {
  const t = {},
    n = {};
  return (
    Object.entries(e.props).forEach(([r, s]) => {
      r.startsWith('on') && typeof s == 'function'
        ? (oa.includes(r) && (t[r] = `this.dataset.${r} = true`), (n[r] = s))
        : (t[r] = s);
    }),
    { props: t, eventHandlers: n }
  );
}
const Kd = e => ({
    hooks: {
      'tags:resolve': function (t) {
        for (const n of t.tags)
          if (Dd.includes(n.tag)) {
            const { props: r, eventHandlers: s } = Ud(n);
            (n.props = r),
              Object.keys(s).length &&
                ((n.props.src || n.props.href) &&
                  (n.key = n.key || oo(n.props.src || n.props.href)),
                (n._eventHandlers = s));
          }
      },
      'dom:renderTag': function (t, n, r) {
        if (!t.tag._eventHandlers) return;
        const s = t.tag.tag === 'bodyAttrs' ? n.defaultView : t.$el;
        Object.entries(t.tag._eventHandlers).forEach(([o, i]) => {
          const l = `${t.tag._d || t.tag._p}:${o}`,
            a = o.slice(2).toLowerCase(),
            u = `data-h-${a}`;
          if ((r(t.id, l, () => {}), t.$el.hasAttribute(u))) return;
          t.$el.setAttribute(u, '');
          let c;
          const f = d => {
            i(d), c == null || c.disconnect();
          };
          o in t.$el.dataset
            ? f(new Event(o.replace('on', '')))
            : oa.includes(o) && typeof MutationObserver < 'u'
            ? ((c = new MutationObserver(d => {
                d.some(v => v.attributeName === `data-${o}`) &&
                  (f(new Event(o.replace('on', ''))),
                  c == null || c.disconnect());
              })),
              c.observe(t.$el, { attributes: !0 }))
            : s.addEventListener(a, f),
            r(t.id, l, () => {
              c == null || c.disconnect(),
                s.removeEventListener(a, f),
                t.$el.removeAttribute(u);
            });
        });
      }
    }
  }),
  Wd = ['link', 'style', 'script', 'noscript'],
  qd = {
    hooks: {
      'tag:normalise': ({ tag: e }) => {
        e.key && Wd.includes(e.tag) && (e.props['data-hid'] = e._h = oo(e.key));
      }
    }
  },
  Vd = {
    hooks: {
      'tags:resolve': e => {
        const t = n => {
          var r;
          return (r = e.tags.find(s => s._d === n)) == null ? void 0 : r._p;
        };
        for (const { prefix: n, offset: r } of Hd)
          for (const s of e.tags.filter(
            o => typeof o.tagPriority == 'string' && o.tagPriority.startsWith(n)
          )) {
            const o = t(s.tagPriority.replace(n, ''));
            typeof o < 'u' && (s._p = o + r);
          }
        e.tags.sort((n, r) => n._p - r._p).sort((n, r) => Er(n) - Er(r));
      }
    }
  },
  zd = { meta: 'content', link: 'href', htmlAttrs: 'lang' },
  Jd = e => ({
    hooks: {
      'tags:resolve': t => {
        var l;
        const { tags: n } = t,
          r =
            (l = n.find(a => a.tag === 'title')) == null
              ? void 0
              : l.textContent,
          s = n.findIndex(a => a.tag === 'templateParams'),
          o = s !== -1 ? n[s].props : {},
          i = o.separator || '|';
        delete o.separator, (o.pageTitle = lr(o.pageTitle || r || '', o, i));
        for (const a of n.filter(u => u.processTemplateParams !== !1)) {
          const u = zd[a.tag];
          u && typeof a.props[u] == 'string'
            ? (a.props[u] = lr(a.props[u], o, i))
            : (a.processTemplateParams === !0 ||
                ['titleTemplate', 'title'].includes(a.tag)) &&
              ['innerHTML', 'textContent'].forEach(c => {
                typeof a[c] == 'string' && (a[c] = lr(a[c], o, i));
              });
        }
        (e._templateParams = o),
          (e._separator = i),
          (t.tags = n.filter(a => a.tag !== 'templateParams'));
      }
    }
  }),
  Qd = {
    hooks: {
      'tags:resolve': e => {
        const { tags: t } = e;
        let n = t.findIndex(s => s.tag === 'titleTemplate');
        const r = t.findIndex(s => s.tag === 'title');
        if (r !== -1 && n !== -1) {
          const s = li(t[n].textContent, t[r].textContent);
          s !== null ? (t[r].textContent = s || t[r].textContent) : delete t[r];
        } else if (n !== -1) {
          const s = li(t[n].textContent);
          s !== null &&
            ((t[n].textContent = s), (t[n].tag = 'title'), (n = -1));
        }
        n !== -1 && delete t[n], (e.tags = t.filter(Boolean));
      }
    }
  };
let la;
function Xd(e = {}) {
  const t = Yd(e);
  return t.use(Nd()), (la = t);
}
function ui(e, t) {
  return !e || (e === 'server' && t) || (e === 'client' && !t);
}
function Yd(e = {}) {
  const t = ea();
  t.addHooks(e.hooks || {}),
    (e.document = e.document || (Ad ? document : void 0));
  const n = !e.document,
    r = () => {
      (l.dirty = !0), t.callHook('entries:updated', l);
    };
  let s = 0,
    o = [];
  const i = [],
    l = {
      plugins: i,
      dirty: !1,
      resolvedOptions: e,
      hooks: t,
      headEntries() {
        return o;
      },
      use(a) {
        const u = typeof a == 'function' ? a(l) : a;
        (!u.key || !i.some(c => c.key === u.key)) &&
          (i.push(u), ui(u.mode, n) && t.addHooks(u.hooks || {}));
      },
      push(a, u) {
        u == null || delete u.head;
        const c = { _i: s++, input: a, ...u };
        return (
          ui(c.mode, n) && (o.push(c), r()),
          {
            dispose() {
              (o = o.filter(f => f._i !== c._i)),
                t.callHook('entries:updated', l),
                r();
            },
            patch(f) {
              (o = o.map(d => (d._i === c._i && (d.input = c.input = f), d))),
                r();
            }
          }
        );
      },
      async resolveTags() {
        const a = { tags: [], entries: [...o] };
        await t.callHook('entries:resolve', a);
        for (const u of a.entries) {
          const c = u.resolvedInput || u.input;
          if (
            ((u.resolvedInput = await (u.transform ? u.transform(c) : c)),
            u.resolvedInput)
          )
            for (const f of await Md(u)) {
              const d = {
                tag: f,
                entry: u,
                resolvedOptions: l.resolvedOptions
              };
              await t.callHook('tag:normalise', d), a.tags.push(d.tag);
            }
        }
        return (
          await t.callHook('tags:beforeResolve', a),
          await t.callHook('tags:resolve', a),
          a.tags
        );
      },
      ssr: n
    };
  return (
    [
      Fd,
      Bd,
      Kd,
      qd,
      Vd,
      Jd,
      Qd,
      ...((e == null ? void 0 : e.plugins) || [])
    ].forEach(a => l.use(a)),
    l.hooks.callHook('init', l),
    l
  );
}
function Zd() {
  return la;
}
const Gd = Wl.startsWith('3');
function eh(e) {
  return typeof e == 'function' ? e() : te(e);
}
function Cr(e, t = '') {
  if (e instanceof Promise) return e;
  const n = eh(e);
  return !e || !n
    ? n
    : Array.isArray(n)
    ? n.map(r => Cr(r, t))
    : typeof n == 'object'
    ? Object.fromEntries(
        Object.entries(n).map(([r, s]) =>
          r === 'titleTemplate' || r.startsWith('on')
            ? [r, te(s)]
            : [r, Cr(s, r)]
        )
      )
    : n;
}
const th = {
    hooks: {
      'entries:resolve': function (e) {
        for (const t of e.entries) t.resolvedInput = Cr(t.input);
      }
    }
  },
  aa = 'usehead';
function nh(e) {
  return {
    install(n) {
      Gd &&
        ((n.config.globalProperties.$unhead = e),
        (n.config.globalProperties.$head = e),
        n.provide(aa, e));
    }
  }.install;
}
function rh(e = {}) {
  e.domDelayFn = e.domDelayFn || (n => Ht(() => setTimeout(() => n(), 0)));
  const t = Xd(e);
  return t.use(th), (t.install = nh(t)), t;
}
const Es =
    typeof globalThis < 'u'
      ? globalThis
      : typeof window < 'u'
      ? window
      : typeof global < 'u'
      ? global
      : typeof self < 'u'
      ? self
      : {},
  Cs = '__unhead_injection_handler__';
function sh(e) {
  Es[Cs] = e;
}
function oh() {
  if (Cs in Es) return Es[Cs]();
  const e = Me(aa);
  return e || Zd();
}
function ih(e, t = {}) {
  const n = t.head || oh();
  if (n) return n.ssr ? n.push(e, t) : lh(n, e, t);
}
function lh(e, t, n = {}) {
  const r = Ie(!1),
    s = Ie({});
  qc(() => {
    s.value = r.value ? {} : Cr(t);
  });
  const o = e.push(s.value, n);
  return (
    zt(s, l => {
      o.patch(l);
    }),
    Kn() &&
      (Dn(() => {
        o.dispose();
      }),
      El(() => {
        r.value = !0;
      }),
      wl(() => {
        r.value = !1;
      })),
    o
  );
}
function ah(e) {
  return { ctx: { table: e }, matchAll: t => ua(t, e) };
}
function ca(e) {
  const t = {};
  for (const n in e)
    t[n] =
      n === 'dynamic'
        ? new Map(Object.entries(e[n]).map(([r, s]) => [r, ca(s)]))
        : new Map(Object.entries(e[n]));
  return t;
}
function ch(e) {
  return ah(ca(e));
}
function ua(e, t) {
  const n = [];
  for (const [s, o] of fi(t.wildcard)) e.startsWith(s) && n.push(o);
  for (const [s, o] of fi(t.dynamic))
    if (e.startsWith(s + '/')) {
      const i = '/' + e.slice(s.length).split('/').splice(2).join('/');
      n.push(...ua(i, o));
    }
  const r = t.static.get(e);
  return r && n.push(r), n.filter(Boolean);
}
function fi(e) {
  return [...e.entries()].sort((t, n) => t[0].length - n[0].length);
}
function Ts(e, t, n = '.', r) {
  if (!es(t)) return Ts(e, {}, n, r);
  const s = Object.assign({}, t);
  for (const o in e) {
    if (o === '__proto__' || o === 'constructor') continue;
    const i = e[o];
    i != null &&
      ((r && r(s, o, i, n)) ||
        (Array.isArray(i) && Array.isArray(s[o])
          ? (s[o] = [...i, ...s[o]])
          : es(i) && es(s[o])
          ? (s[o] = Ts(i, s[o], (n ? `${n}.` : '') + o.toString(), r))
          : (s[o] = i)));
  }
  return s;
}
function es(e) {
  if (e === null || typeof e != 'object') return !1;
  const t = Object.getPrototypeOf(e);
  return (
    (t === null ||
      t === Object.prototype ||
      Object.getPrototypeOf(t) === null) &&
    !(Symbol.toStringTag in e) &&
    !(Symbol.iterator in e)
  );
}
function fa(e) {
  return (...t) => t.reduce((n, r) => Ts(n, r, '', e), {});
}
const da = fa(),
  uh = fa((e, t, n) => {
    if (e[t] !== void 0 && typeof n == 'function') return (e[t] = n(e[t])), !0;
  });
function fh(e, t) {
  try {
    return t in e;
  } catch {
    return !1;
  }
}
var dh = Object.defineProperty,
  hh = (e, t, n) =>
    t in e
      ? dh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  Rt = (e, t, n) => (hh(e, typeof t != 'symbol' ? t + '' : t, n), n);
class Rs extends Error {
  constructor(t, n = {}) {
    super(t, n),
      Rt(this, 'statusCode', 500),
      Rt(this, 'fatal', !1),
      Rt(this, 'unhandled', !1),
      Rt(this, 'statusMessage'),
      Rt(this, 'data'),
      Rt(this, 'cause'),
      n.cause && !this.cause && (this.cause = n.cause);
  }
  toJSON() {
    const t = { message: this.message, statusCode: Ps(this.statusCode, 500) };
    return (
      this.statusMessage && (t.statusMessage = ha(this.statusMessage)),
      this.data !== void 0 && (t.data = this.data),
      t
    );
  }
}
Rt(Rs, '__h3_error__', !0);
function xs(e) {
  if (typeof e == 'string') return new Rs(e);
  if (ph(e)) return e;
  const t = new Rs(e.message ?? e.statusMessage ?? '', { cause: e.cause || e });
  if (fh(e, 'stack'))
    try {
      Object.defineProperty(t, 'stack', {
        get() {
          return e.stack;
        }
      });
    } catch {
      try {
        t.stack = e.stack;
      } catch {}
    }
  if (
    (e.data && (t.data = e.data),
    e.statusCode
      ? (t.statusCode = Ps(e.statusCode, t.statusCode))
      : e.status && (t.statusCode = Ps(e.status, t.statusCode)),
    e.statusMessage
      ? (t.statusMessage = e.statusMessage)
      : e.statusText && (t.statusMessage = e.statusText),
    t.statusMessage)
  ) {
    const n = t.statusMessage;
    ha(t.statusMessage) !== n &&
      console.warn(
        '[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.'
      );
  }
  return (
    e.fatal !== void 0 && (t.fatal = e.fatal),
    e.unhandled !== void 0 && (t.unhandled = e.unhandled),
    t
  );
}
function ph(e) {
  var t;
  return (
    ((t = e == null ? void 0 : e.constructor) == null
      ? void 0
      : t.__h3_error__) === !0
  );
}
const gh = /[^\u0009\u0020-\u007E]/g;
function ha(e = '') {
  return e.replace(gh, '');
}
function Ps(e, t = 200) {
  return !e ||
    (typeof e == 'string' && (e = Number.parseInt(e, 10)), e < 100 || e > 999)
    ? t
    : e;
}
const mh = Symbol('layout-meta'),
  jr = Symbol('route'),
  Fr = () => Tc(de().payload, 'error'),
  Dt = e => {
    const t = io(e);
    try {
      const n = de(),
        r = Fr();
      n.hooks.callHook('app:error', t), (r.value = r.value || t);
    } catch {
      throw t;
    }
    return t;
  },
  yh = async (e = {}) => {
    const t = de(),
      n = Fr();
    t.callHook('app:error:cleared', e),
      e.redirect && (await it().replace(e.redirect)),
      (n.value = null);
  },
  _h = e => !!(e && typeof e == 'object' && '__nuxt_error' in e),
  io = e => {
    const t = xs(e);
    return (t.__nuxt_error = !0), t;
  },
  it = () => {
    var e;
    return (e = de()) == null ? void 0 : e.$router;
  },
  pa = () => (Al() ? Me(jr, de()._route) : de()._route);
/*! @__NO_SIDE_EFFECTS__ */ const vh = () => {
    try {
      if (de()._processingMiddleware) return !0;
    } catch {
      return !0;
    }
    return !1;
  },
  bh = (e, t) => {
    e || (e = '/');
    const n =
      typeof e == 'string'
        ? e
        : Ql(e.path || '/', e.query || {}) + (e.hash || '');
    if (t != null && t.open) {
      {
        const { target: l = '_blank', windowFeatures: a = {} } = t.open,
          u = Object.entries(a)
            .filter(([c, f]) => f !== void 0)
            .map(([c, f]) => `${c.toLowerCase()}=${f}`)
            .join(', ');
        open(n, l, u);
      }
      return Promise.resolve();
    }
    const r =
      (t == null ? void 0 : t.external) || an(n, { acceptRelative: !0 });
    if (r) {
      if (!(t != null && t.external))
        throw new Error(
          'Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.'
        );
      const l = Wn(n).protocol;
      if (l && Cf(l))
        throw new Error(`Cannot navigate to a URL with '${l}' protocol.`);
    }
    const s = vh();
    if (!r && s) return e;
    const o = it(),
      i = de();
    return r
      ? (i._scope.stop(),
        t != null && t.replace ? location.replace(n) : (location.href = n),
        s ? (i.isHydrating ? new Promise(() => {}) : !1) : Promise.resolve())
      : t != null && t.replace
      ? o.replace(e)
      : o.push(e);
  },
  wh = { nuxt: { buildId: '44260d24-4fb8-4d5d-be85-86f1eefe30bf' } },
  Eh = uh(wh);
function Ch() {
  const e = de();
  return e._appConfig || (e._appConfig = rt(Eh)), e._appConfig;
}
const ks = { name: 'fade', mode: 'out-in' },
  Th = !1,
  Rh = { componentName: 'NuxtLink' },
  xh = '#__nuxt';
let ar, ga;
function Ph() {
  var t;
  const e = (t = Ch().nuxt) == null ? void 0 : t.buildId;
  return (
    (ar = $fetch(ro(`builds/meta/${e}.json`))),
    ar.then(n => {
      ga = ch(n.matcher);
    }),
    ar
  );
}
function Br() {
  return ar || Ph();
}
async function ma(e) {
  return await Br(), da({}, ...ga.matchAll(e).reverse());
}
function di(e, t = {}) {
  const n = kh(e, t),
    r = de(),
    s = (r._payloadCache = r._payloadCache || {});
  return (
    n in s ||
      (s[n] = Ah(e).then(o =>
        o ? ya(n).then(i => i || (delete s[n], null)) : ((s[n] = null), null)
      )),
    s[n]
  );
}
const hi = 'json';
function kh(e, t = {}) {
  const n = new URL(e, 'http://localhost');
  if (n.search)
    throw new Error('Payload URL cannot contain search params: ' + e);
  if (n.host !== 'localhost' || an(n.pathname, { acceptRelative: !0 }))
    throw new Error('Payload URL must not include hostname: ' + e);
  const r = t.hash || (t.fresh ? Date.now() : '');
  return cn(
    Nr().app.baseURL,
    n.pathname,
    r ? `_payload.${r}.${hi}` : `_payload.${hi}`
  );
}
async function ya(e) {
  const t = fetch(e).then(n => n.text().then(_a));
  try {
    return await t;
  } catch (n) {
    console.warn('[nuxt] Cannot load payload ', e, n);
  }
  return null;
}
async function Ah(e = pa().path) {
  if ((await Br()).prerendered.includes(e)) return !0;
  const n = await ma(e);
  return !!n.prerender && !n.redirect;
}
let nr = null;
async function Sh() {
  if (nr) return nr;
  const e = document.getElementById('__NUXT_DATA__');
  if (!e) return {};
  const t = _a(e.textContent || ''),
    n = e.dataset.src ? await ya(e.dataset.src) : void 0;
  return (nr = { ...t, ...n, ...window.__NUXT__ }), nr;
}
function _a(e) {
  return Cd(e, de()._payloadRevivers);
}
function Oh(e, t) {
  de()._payloadRevivers[e] = t;
}
const pi = {
    NuxtError: e => io(e),
    EmptyShallowRef: e =>
      xn(e === '_' ? void 0 : e === '0n' ? BigInt(0) : br(e)),
    EmptyRef: e => Ie(e === '_' ? void 0 : e === '0n' ? BigInt(0) : br(e)),
    ShallowRef: e => xn(e),
    ShallowReactive: e => jn(e),
    Ref: e => Ie(e),
    Reactive: e => rt(e)
  },
  Ih = wt({
    name: 'nuxt:revive-payload:client',
    order: -30,
    async setup(e) {
      let t, n;
      for (const r in pi) Oh(r, pi[r]);
      Object.assign(
        e.payload,
        (([t, n] = Mn(() => e.runWithContext(Sh))), (t = await t), n(), t)
      ),
        (window.__NUXT__ = e.payload);
    }
  }),
  Mh = [],
  Hh = wt({
    name: 'nuxt:head',
    enforce: 'pre',
    setup(e) {
      const t = rh({ plugins: Mh });
      sh(() => de().vueApp._context.provides.usehead), e.vueApp.use(t);
      {
        let n = !0;
        const r = async () => {
          (n = !1), await ia(t);
        };
        t.hooks.hook('dom:beforeRender', s => {
          s.shouldRender = !n;
        }),
          e.hooks.hook('page:start', () => {
            n = !0;
          }),
          e.hooks.hook('page:finish', () => {
            e.isHydrating || r();
          }),
          e.hooks.hook('app:error', r),
          e.hooks.hook('app:suspense:resolve', r);
      }
    }
  });
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const Bt = typeof window < 'u';
function $h(e) {
  return e.__esModule || e[Symbol.toStringTag] === 'Module';
}
const oe = Object.assign;
function ts(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = ze(s) ? s.map(e) : e(s);
  }
  return n;
}
const En = () => {},
  ze = Array.isArray,
  Lh = /\/$/,
  Nh = e => e.replace(Lh, '');
function ns(e, t, n = '/') {
  let r,
    s = {},
    o = '',
    i = '';
  const l = t.indexOf('#');
  let a = t.indexOf('?');
  return (
    l < a && l >= 0 && (a = -1),
    a > -1 &&
      ((r = t.slice(0, a)),
      (o = t.slice(a + 1, l > -1 ? l : t.length)),
      (s = e(o))),
    l > -1 && ((r = r || t.slice(0, l)), (i = t.slice(l, t.length))),
    (r = Dh(r ?? t, n)),
    { fullPath: r + (o && '?') + o + i, path: r, query: s, hash: i }
  );
}
function jh(e, t) {
  const n = t.query ? e(t.query) : '';
  return t.path + (n && '?') + n + (t.hash || '');
}
function gi(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || '/';
}
function Fh(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return (
    r > -1 &&
    r === s &&
    tn(t.matched[r], n.matched[s]) &&
    va(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function tn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function va(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Bh(e[n], t[n])) return !1;
  return !0;
}
function Bh(e, t) {
  return ze(e) ? mi(e, t) : ze(t) ? mi(t, e) : e === t;
}
function mi(e, t) {
  return ze(t)
    ? e.length === t.length && e.every((n, r) => n === t[r])
    : e.length === 1 && e[0] === t;
}
function Dh(e, t) {
  if (e.startsWith('/')) return e;
  if (!e) return t;
  const n = t.split('/'),
    r = e.split('/'),
    s = r[r.length - 1];
  (s === '..' || s === '.') && r.push('');
  let o = n.length - 1,
    i,
    l;
  for (i = 0; i < r.length; i++)
    if (((l = r[i]), l !== '.'))
      if (l === '..') o > 1 && o--;
      else break;
  return (
    n.slice(0, o).join('/') +
    '/' +
    r.slice(i - (i === r.length ? 1 : 0)).join('/')
  );
}
var Hn;
(function (e) {
  (e.pop = 'pop'), (e.push = 'push');
})(Hn || (Hn = {}));
var Cn;
(function (e) {
  (e.back = 'back'), (e.forward = 'forward'), (e.unknown = '');
})(Cn || (Cn = {}));
function Uh(e) {
  if (!e)
    if (Bt) {
      const t = document.querySelector('base');
      (e = (t && t.getAttribute('href')) || '/'),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ''));
    } else e = '/';
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), Nh(e);
}
const Kh = /^[^#]+#/;
function Wh(e, t) {
  return e.replace(Kh, '#') + t;
}
function qh(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0)
  };
}
const Dr = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Vh(e) {
  let t;
  if ('el' in e) {
    const n = e.el,
      r = typeof n == 'string' && n.startsWith('#'),
      s =
        typeof n == 'string'
          ? r
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!s) return;
    t = qh(s, e);
  } else t = e;
  'scrollBehavior' in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      );
}
function yi(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const As = new Map();
function zh(e, t) {
  As.set(e, t);
}
function Jh(e) {
  const t = As.get(e);
  return As.delete(e), t;
}
let Qh = () => location.protocol + '//' + location.host;
function ba(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    o = e.indexOf('#');
  if (o > -1) {
    let l = s.includes(e.slice(o)) ? e.slice(o).length : 1,
      a = s.slice(l);
    return a[0] !== '/' && (a = '/' + a), gi(a, '');
  }
  return gi(n, e) + r + s;
}
function Xh(e, t, n, r) {
  let s = [],
    o = [],
    i = null;
  const l = ({ state: d }) => {
    const g = ba(e, location),
      v = n.value,
      E = t.value;
    let A = 0;
    if (d) {
      if (((n.value = g), (t.value = d), i && i === v)) {
        i = null;
        return;
      }
      A = E ? d.position - E.position : 0;
    } else r(g);
    s.forEach(x => {
      x(n.value, v, {
        delta: A,
        type: Hn.pop,
        direction: A ? (A > 0 ? Cn.forward : Cn.back) : Cn.unknown
      });
    });
  };
  function a() {
    i = n.value;
  }
  function u(d) {
    s.push(d);
    const g = () => {
      const v = s.indexOf(d);
      v > -1 && s.splice(v, 1);
    };
    return o.push(g), g;
  }
  function c() {
    const { history: d } = window;
    d.state && d.replaceState(oe({}, d.state, { scroll: Dr() }), '');
  }
  function f() {
    for (const d of o) d();
    (o = []),
      window.removeEventListener('popstate', l),
      window.removeEventListener('beforeunload', c);
  }
  return (
    window.addEventListener('popstate', l),
    window.addEventListener('beforeunload', c, { passive: !0 }),
    { pauseListeners: a, listen: u, destroy: f }
  );
}
function _i(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? Dr() : null
  };
}
function Yh(e) {
  const { history: t, location: n } = window,
    r = { value: ba(e, n) },
    s = { value: t.state };
  s.value ||
    o(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
      },
      !0
    );
  function o(a, u, c) {
    const f = e.indexOf('#'),
      d =
        f > -1
          ? (n.host && document.querySelector('base') ? e : e.slice(f)) + a
          : Qh() + e + a;
    try {
      t[c ? 'replaceState' : 'pushState'](u, '', d), (s.value = u);
    } catch (g) {
      console.error(g), n[c ? 'replace' : 'assign'](d);
    }
  }
  function i(a, u) {
    const c = oe({}, t.state, _i(s.value.back, a, s.value.forward, !0), u, {
      position: s.value.position
    });
    o(a, c, !0), (r.value = a);
  }
  function l(a, u) {
    const c = oe({}, s.value, t.state, { forward: a, scroll: Dr() });
    o(c.current, c, !0);
    const f = oe({}, _i(r.value, a, null), { position: c.position + 1 }, u);
    o(a, f, !1), (r.value = a);
  }
  return { location: r, state: s, push: l, replace: i };
}
function wa(e) {
  e = Uh(e);
  const t = Yh(e),
    n = Xh(e, t.state, t.location, t.replace);
  function r(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const s = oe(
    { location: '', base: e, go: r, createHref: Wh.bind(null, e) },
    t,
    n
  );
  return (
    Object.defineProperty(s, 'location', {
      enumerable: !0,
      get: () => t.location.value
    }),
    Object.defineProperty(s, 'state', {
      enumerable: !0,
      get: () => t.state.value
    }),
    s
  );
}
function Zh(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ''),
    e.includes('#') || (e += '#'),
    wa(e)
  );
}
function Gh(e) {
  return typeof e == 'string' || (e && typeof e == 'object');
}
function Ea(e) {
  return typeof e == 'string' || typeof e == 'symbol';
}
const Xe = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0
  },
  Ca = Symbol('');
var vi;
(function (e) {
  (e[(e.aborted = 4)] = 'aborted'),
    (e[(e.cancelled = 8)] = 'cancelled'),
    (e[(e.duplicated = 16)] = 'duplicated');
})(vi || (vi = {}));
function nn(e, t) {
  return oe(new Error(), { type: e, [Ca]: !0 }, t);
}
function et(e, t) {
  return e instanceof Error && Ca in e && (t == null || !!(e.type & t));
}
const bi = '[^/]+?',
  ep = { sensitive: !1, strict: !1, start: !0, end: !0 },
  tp = /[.+*?^${}()[\]/\\]/g;
function np(e, t) {
  const n = oe({}, ep, t),
    r = [];
  let s = n.start ? '^' : '';
  const o = [];
  for (const u of e) {
    const c = u.length ? [] : [90];
    n.strict && !u.length && (s += '/');
    for (let f = 0; f < u.length; f++) {
      const d = u[f];
      let g = 40 + (n.sensitive ? 0.25 : 0);
      if (d.type === 0)
        f || (s += '/'), (s += d.value.replace(tp, '\\$&')), (g += 40);
      else if (d.type === 1) {
        const { value: v, repeatable: E, optional: A, regexp: x } = d;
        o.push({ name: v, repeatable: E, optional: A });
        const b = x || bi;
        if (b !== bi) {
          g += 10;
          try {
            new RegExp(`(${b})`);
          } catch (m) {
            throw new Error(
              `Invalid custom RegExp for param "${v}" (${b}): ` + m.message
            );
          }
        }
        let y = E ? `((?:${b})(?:/(?:${b}))*)` : `(${b})`;
        f || (y = A && u.length < 2 ? `(?:/${y})` : '/' + y),
          A && (y += '?'),
          (s += y),
          (g += 20),
          A && (g += -8),
          E && (g += -20),
          b === '.*' && (g += -50);
      }
      c.push(g);
    }
    r.push(c);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += '/?'), n.end ? (s += '$') : n.strict && (s += '(?:/|$)');
  const i = new RegExp(s, n.sensitive ? '' : 'i');
  function l(u) {
    const c = u.match(i),
      f = {};
    if (!c) return null;
    for (let d = 1; d < c.length; d++) {
      const g = c[d] || '',
        v = o[d - 1];
      f[v.name] = g && v.repeatable ? g.split('/') : g;
    }
    return f;
  }
  function a(u) {
    let c = '',
      f = !1;
    for (const d of e) {
      (!f || !c.endsWith('/')) && (c += '/'), (f = !1);
      for (const g of d)
        if (g.type === 0) c += g.value;
        else if (g.type === 1) {
          const { value: v, repeatable: E, optional: A } = g,
            x = v in u ? u[v] : '';
          if (ze(x) && !E)
            throw new Error(
              `Provided param "${v}" is an array but it is not repeatable (* or + modifiers)`
            );
          const b = ze(x) ? x.join('/') : x;
          if (!b)
            if (A)
              d.length < 2 &&
                (c.endsWith('/') ? (c = c.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${v}"`);
          c += b;
        }
    }
    return c || '/';
  }
  return { re: i, score: r, keys: o, parse: l, stringify: a };
}
function rp(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0;
}
function sp(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const o = rp(r[n], s[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (wi(r)) return 1;
    if (wi(s)) return -1;
  }
  return s.length - r.length;
}
function wi(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const op = { type: 0, value: '' },
  ip = /[a-zA-Z0-9_]/;
function lp(e) {
  if (!e) return [[]];
  if (e === '/') return [[op]];
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`);
  function t(g) {
    throw new Error(`ERR (${n})/"${u}": ${g}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let o;
  function i() {
    o && s.push(o), (o = []);
  }
  let l = 0,
    a,
    u = '',
    c = '';
  function f() {
    u &&
      (n === 0
        ? o.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
        ? (o.length > 1 &&
            (a === '*' || a === '+') &&
            t(
              `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
            ),
          o.push({
            type: 1,
            value: u,
            regexp: c,
            repeatable: a === '*' || a === '+',
            optional: a === '*' || a === '?'
          }))
        : t('Invalid state to consume buffer'),
      (u = ''));
  }
  function d() {
    u += a;
  }
  for (; l < e.length; ) {
    if (((a = e[l++]), a === '\\' && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        a === '/' ? (u && f(), i()) : a === ':' ? (f(), (n = 1)) : d();
        break;
      case 4:
        d(), (n = r);
        break;
      case 1:
        a === '('
          ? (n = 2)
          : ip.test(a)
          ? d()
          : (f(), (n = 0), a !== '*' && a !== '?' && a !== '+' && l--);
        break;
      case 2:
        a === ')'
          ? c[c.length - 1] == '\\'
            ? (c = c.slice(0, -1) + a)
            : (n = 3)
          : (c += a);
        break;
      case 3:
        f(), (n = 0), a !== '*' && a !== '?' && a !== '+' && l--, (c = '');
        break;
      default:
        t('Unknown state');
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), f(), i(), s;
}
function ap(e, t, n) {
  const r = np(lp(e.path), n),
    s = oe(r, { record: e, parent: t, children: [], alias: [] });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function cp(e, t) {
  const n = [],
    r = new Map();
  t = Ti({ strict: !1, end: !0, sensitive: !1 }, t);
  function s(c) {
    return r.get(c);
  }
  function o(c, f, d) {
    const g = !d,
      v = up(c);
    v.aliasOf = d && d.record;
    const E = Ti(t, c),
      A = [v];
    if ('alias' in c) {
      const y = typeof c.alias == 'string' ? [c.alias] : c.alias;
      for (const m of y)
        A.push(
          oe({}, v, {
            components: d ? d.record.components : v.components,
            path: m,
            aliasOf: d ? d.record : v
          })
        );
    }
    let x, b;
    for (const y of A) {
      const { path: m } = y;
      if (f && m[0] !== '/') {
        const T = f.record.path,
          I = T[T.length - 1] === '/' ? '' : '/';
        y.path = f.record.path + (m && I + m);
      }
      if (
        ((x = ap(y, f, E)),
        d
          ? d.alias.push(x)
          : ((b = b || x),
            b !== x && b.alias.push(x),
            g && c.name && !Ci(x) && i(c.name)),
        v.children)
      ) {
        const T = v.children;
        for (let I = 0; I < T.length; I++) o(T[I], x, d && d.children[I]);
      }
      (d = d || x),
        ((x.record.components && Object.keys(x.record.components).length) ||
          x.record.name ||
          x.record.redirect) &&
          a(x);
    }
    return b
      ? () => {
          i(b);
        }
      : En;
  }
  function i(c) {
    if (Ea(c)) {
      const f = r.get(c);
      f &&
        (r.delete(c),
        n.splice(n.indexOf(f), 1),
        f.children.forEach(i),
        f.alias.forEach(i));
    } else {
      const f = n.indexOf(c);
      f > -1 &&
        (n.splice(f, 1),
        c.record.name && r.delete(c.record.name),
        c.children.forEach(i),
        c.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function a(c) {
    let f = 0;
    for (
      ;
      f < n.length &&
      sp(c, n[f]) >= 0 &&
      (c.record.path !== n[f].record.path || !Ta(c, n[f]));

    )
      f++;
    n.splice(f, 0, c), c.record.name && !Ci(c) && r.set(c.record.name, c);
  }
  function u(c, f) {
    let d,
      g = {},
      v,
      E;
    if ('name' in c && c.name) {
      if (((d = r.get(c.name)), !d)) throw nn(1, { location: c });
      (E = d.record.name),
        (g = oe(
          Ei(
            f.params,
            d.keys.filter(b => !b.optional).map(b => b.name)
          ),
          c.params &&
            Ei(
              c.params,
              d.keys.map(b => b.name)
            )
        )),
        (v = d.stringify(g));
    } else if ('path' in c)
      (v = c.path),
        (d = n.find(b => b.re.test(v))),
        d && ((g = d.parse(v)), (E = d.record.name));
    else {
      if (((d = f.name ? r.get(f.name) : n.find(b => b.re.test(f.path))), !d))
        throw nn(1, { location: c, currentLocation: f });
      (E = d.record.name),
        (g = oe({}, f.params, c.params)),
        (v = d.stringify(g));
    }
    const A = [];
    let x = d;
    for (; x; ) A.unshift(x.record), (x = x.parent);
    return { name: E, path: v, params: g, matched: A, meta: dp(A) };
  }
  return (
    e.forEach(c => o(c)),
    {
      addRoute: o,
      resolve: u,
      removeRoute: i,
      getRoutes: l,
      getRecordMatcher: s
    }
  );
}
function Ei(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function up(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: fp(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      'components' in e
        ? e.components || null
        : e.component && { default: e.component }
  };
}
function fp(e) {
  const t = {},
    n = e.props || !1;
  if ('component' in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == 'object' ? n[r] : n;
  return t;
}
function Ci(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function dp(e) {
  return e.reduce((t, n) => oe(t, n.meta), {});
}
function Ti(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function Ta(e, t) {
  return t.children.some(n => n === e || Ta(e, n));
}
const Ra = /#/g,
  hp = /&/g,
  pp = /\//g,
  gp = /=/g,
  mp = /\?/g,
  xa = /\+/g,
  yp = /%5B/g,
  _p = /%5D/g,
  Pa = /%5E/g,
  vp = /%60/g,
  ka = /%7B/g,
  bp = /%7C/g,
  Aa = /%7D/g,
  wp = /%20/g;
function lo(e) {
  return encodeURI('' + e)
    .replace(bp, '|')
    .replace(yp, '[')
    .replace(_p, ']');
}
function Ep(e) {
  return lo(e).replace(ka, '{').replace(Aa, '}').replace(Pa, '^');
}
function Ss(e) {
  return lo(e)
    .replace(xa, '%2B')
    .replace(wp, '+')
    .replace(Ra, '%23')
    .replace(hp, '%26')
    .replace(vp, '`')
    .replace(ka, '{')
    .replace(Aa, '}')
    .replace(Pa, '^');
}
function Cp(e) {
  return Ss(e).replace(gp, '%3D');
}
function Tp(e) {
  return lo(e).replace(Ra, '%23').replace(mp, '%3F');
}
function Rp(e) {
  return e == null ? '' : Tp(e).replace(pp, '%2F');
}
function Tr(e) {
  try {
    return decodeURIComponent('' + e);
  } catch {}
  return '' + e;
}
function xp(e) {
  const t = {};
  if (e === '' || e === '?') return t;
  const r = (e[0] === '?' ? e.slice(1) : e).split('&');
  for (let s = 0; s < r.length; ++s) {
    const o = r[s].replace(xa, ' '),
      i = o.indexOf('='),
      l = Tr(i < 0 ? o : o.slice(0, i)),
      a = i < 0 ? null : Tr(o.slice(i + 1));
    if (l in t) {
      let u = t[l];
      ze(u) || (u = t[l] = [u]), u.push(a);
    } else t[l] = a;
  }
  return t;
}
function Ri(e) {
  let t = '';
  for (let n in e) {
    const r = e[n];
    if (((n = Cp(n)), r == null)) {
      r !== void 0 && (t += (t.length ? '&' : '') + n);
      continue;
    }
    (ze(r) ? r.map(o => o && Ss(o)) : [r && Ss(r)]).forEach(o => {
      o !== void 0 &&
        ((t += (t.length ? '&' : '') + n), o != null && (t += '=' + o));
    });
  }
  return t;
}
function Pp(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 &&
      (t[n] = ze(r)
        ? r.map(s => (s == null ? null : '' + s))
        : r == null
        ? r
        : '' + r);
  }
  return t;
}
const kp = Symbol(''),
  xi = Symbol(''),
  ao = Symbol(''),
  Sa = Symbol(''),
  Os = Symbol('');
function hn() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function mt(e, t, n, r, s) {
  const o = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((i, l) => {
      const a = f => {
          f === !1
            ? l(nn(4, { from: n, to: t }))
            : f instanceof Error
            ? l(f)
            : Gh(f)
            ? l(nn(2, { from: t, to: f }))
            : (o &&
                r.enterCallbacks[s] === o &&
                typeof f == 'function' &&
                o.push(f),
              i());
        },
        u = e.call(r && r.instances[s], t, n, a);
      let c = Promise.resolve(u);
      e.length < 3 && (c = c.then(a)), c.catch(f => l(f));
    });
}
function rs(e, t, n, r) {
  const s = [];
  for (const o of e)
    for (const i in o.components) {
      let l = o.components[i];
      if (!(t !== 'beforeRouteEnter' && !o.instances[i]))
        if (Ap(l)) {
          const u = (l.__vccOpts || l)[t];
          u && s.push(mt(u, n, r, o, i));
        } else {
          let a = l();
          s.push(() =>
            a.then(u => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${i}" at "${o.path}"`)
                );
              const c = $h(u) ? u.default : u;
              o.components[i] = c;
              const d = (c.__vccOpts || c)[t];
              return d && mt(d, n, r, o, i)();
            })
          );
        }
    }
  return s;
}
function Ap(e) {
  return (
    typeof e == 'object' ||
    'displayName' in e ||
    'props' in e ||
    '__vccOpts' in e
  );
}
function Pi(e) {
  const t = Me(ao),
    n = Me(Sa),
    r = xe(() => t.resolve(te(e.to))),
    s = xe(() => {
      const { matched: a } = r.value,
        { length: u } = a,
        c = a[u - 1],
        f = n.matched;
      if (!c || !f.length) return -1;
      const d = f.findIndex(tn.bind(null, c));
      if (d > -1) return d;
      const g = ki(a[u - 2]);
      return u > 1 && ki(c) === g && f[f.length - 1].path !== g
        ? f.findIndex(tn.bind(null, a[u - 2]))
        : d;
    }),
    o = xe(() => s.value > -1 && Mp(n.params, r.value.params)),
    i = xe(
      () =>
        s.value > -1 &&
        s.value === n.matched.length - 1 &&
        va(n.params, r.value.params)
    );
  function l(a = {}) {
    return Ip(a)
      ? t[te(e.replace) ? 'replace' : 'push'](te(e.to)).catch(En)
      : Promise.resolve();
  }
  return {
    route: r,
    href: xe(() => r.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l
  };
}
const Sp = bt({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: 'page' }
    },
    useLink: Pi,
    setup(e, { slots: t }) {
      const n = rt(Pi(e)),
        { options: r } = Me(ao),
        s = xe(() => ({
          [Ai(e.activeClass, r.linkActiveClass, 'router-link-active')]:
            n.isActive,
          [Ai(
            e.exactActiveClass,
            r.linkExactActiveClass,
            'router-link-exact-active'
          )]: n.isExactActive
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom
          ? o
          : Ve(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: s.value
              },
              o
            );
      };
    }
  }),
  Op = Sp;
function Ip(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target');
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Mp(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == 'string') {
      if (r !== s) return !1;
    } else if (!ze(s) || s.length !== r.length || r.some((o, i) => o !== s[i]))
      return !1;
  }
  return !0;
}
function ki(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
}
const Ai = (e, t, n) => e ?? t ?? n,
  Hp = bt({
    name: 'RouterView',
    inheritAttrs: !1,
    props: { name: { type: String, default: 'default' }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const r = Me(Os),
        s = xe(() => e.route || r.value),
        o = Me(xi, 0),
        i = xe(() => {
          let u = te(o);
          const { matched: c } = s.value;
          let f;
          for (; (f = c[u]) && !f.components; ) u++;
          return u;
        }),
        l = xe(() => s.value.matched[i.value]);
      Qt(
        xi,
        xe(() => i.value + 1)
      ),
        Qt(kp, l),
        Qt(Os, s);
      const a = Ie();
      return (
        zt(
          () => [a.value, l.value, e.name],
          ([u, c, f], [d, g, v]) => {
            c &&
              ((c.instances[f] = u),
              g &&
                g !== c &&
                u &&
                u === d &&
                (c.leaveGuards.size || (c.leaveGuards = g.leaveGuards),
                c.updateGuards.size || (c.updateGuards = g.updateGuards))),
              u &&
                c &&
                (!g || !tn(c, g) || !d) &&
                (c.enterCallbacks[f] || []).forEach(E => E(u));
          },
          { flush: 'post' }
        ),
        () => {
          const u = s.value,
            c = e.name,
            f = l.value,
            d = f && f.components[c];
          if (!d) return Si(n.default, { Component: d, route: u });
          const g = f.props[c],
            v = g
              ? g === !0
                ? u.params
                : typeof g == 'function'
                ? g(u)
                : g
              : null,
            A = Ve(
              d,
              oe({}, v, t, {
                onVnodeUnmounted: x => {
                  x.component.isUnmounted && (f.instances[c] = null);
                },
                ref: a
              })
            );
          return Si(n.default, { Component: A, route: u }) || A;
        }
      );
    }
  });
function Si(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Oa = Hp;
function $p(e) {
  const t = cp(e.routes, e),
    n = e.parseQuery || xp,
    r = e.stringifyQuery || Ri,
    s = e.history,
    o = hn(),
    i = hn(),
    l = hn(),
    a = xn(Xe);
  let u = Xe;
  Bt &&
    e.scrollBehavior &&
    'scrollRestoration' in history &&
    (history.scrollRestoration = 'manual');
  const c = ts.bind(null, C => '' + C),
    f = ts.bind(null, Rp),
    d = ts.bind(null, Tr);
  function g(C, F) {
    let $, W;
    return (
      Ea(C) ? (($ = t.getRecordMatcher(C)), (W = F)) : (W = C), t.addRoute(W, $)
    );
  }
  function v(C) {
    const F = t.getRecordMatcher(C);
    F && t.removeRoute(F);
  }
  function E() {
    return t.getRoutes().map(C => C.record);
  }
  function A(C) {
    return !!t.getRecordMatcher(C);
  }
  function x(C, F) {
    if (((F = oe({}, F || a.value)), typeof C == 'string')) {
      const _ = ns(n, C, F.path),
        w = t.resolve({ path: _.path }, F),
        R = s.createHref(_.fullPath);
      return oe(_, w, {
        params: d(w.params),
        hash: Tr(_.hash),
        redirectedFrom: void 0,
        href: R
      });
    }
    let $;
    if ('path' in C) $ = oe({}, C, { path: ns(n, C.path, F.path).path });
    else {
      const _ = oe({}, C.params);
      for (const w in _) _[w] == null && delete _[w];
      ($ = oe({}, C, { params: f(_) })), (F.params = f(F.params));
    }
    const W = t.resolve($, F),
      se = C.hash || '';
    W.params = c(d(W.params));
    const h = jh(r, oe({}, C, { hash: Ep(se), path: W.path })),
      p = s.createHref(h);
    return oe(
      { fullPath: h, hash: se, query: r === Ri ? Pp(C.query) : C.query || {} },
      W,
      { redirectedFrom: void 0, href: p }
    );
  }
  function b(C) {
    return typeof C == 'string' ? ns(n, C, a.value.path) : oe({}, C);
  }
  function y(C, F) {
    if (u !== C) return nn(8, { from: F, to: C });
  }
  function m(C) {
    return L(C);
  }
  function T(C) {
    return m(oe(b(C), { replace: !0 }));
  }
  function I(C) {
    const F = C.matched[C.matched.length - 1];
    if (F && F.redirect) {
      const { redirect: $ } = F;
      let W = typeof $ == 'function' ? $(C) : $;
      return (
        typeof W == 'string' &&
          ((W = W.includes('?') || W.includes('#') ? (W = b(W)) : { path: W }),
          (W.params = {})),
        oe(
          { query: C.query, hash: C.hash, params: 'path' in W ? {} : C.params },
          W
        )
      );
    }
  }
  function L(C, F) {
    const $ = (u = x(C)),
      W = a.value,
      se = C.state,
      h = C.force,
      p = C.replace === !0,
      _ = I($);
    if (_)
      return L(
        oe(b(_), {
          state: typeof _ == 'object' ? oe({}, se, _.state) : se,
          force: h,
          replace: p
        }),
        F || $
      );
    const w = $;
    w.redirectedFrom = F;
    let R;
    return (
      !h && Fh(r, W, $) && ((R = nn(16, { to: w, from: W })), Je(W, W, !0, !1)),
      (R ? Promise.resolve(R) : N(w, W))
        .catch(P => (et(P) ? (et(P, 2) ? P : lt(P)) : K(P, w, W)))
        .then(P => {
          if (P) {
            if (et(P, 2))
              return L(
                oe({ replace: p }, b(P.to), {
                  state: typeof P.to == 'object' ? oe({}, se, P.to.state) : se,
                  force: h
                }),
                F || w
              );
          } else P = M(w, W, !0, p, se);
          return Q(w, W, P), P;
        })
    );
  }
  function S(C, F) {
    const $ = y(C, F);
    return $ ? Promise.reject($) : Promise.resolve();
  }
  function B(C) {
    const F = Lt.values().next().value;
    return F && typeof F.runWithContext == 'function'
      ? F.runWithContext(C)
      : C();
  }
  function N(C, F) {
    let $;
    const [W, se, h] = Lp(C, F);
    $ = rs(W.reverse(), 'beforeRouteLeave', C, F);
    for (const _ of W)
      _.leaveGuards.forEach(w => {
        $.push(mt(w, C, F));
      });
    const p = S.bind(null, C, F);
    return (
      $.push(p),
      be($)
        .then(() => {
          $ = [];
          for (const _ of o.list()) $.push(mt(_, C, F));
          return $.push(p), be($);
        })
        .then(() => {
          $ = rs(se, 'beforeRouteUpdate', C, F);
          for (const _ of se)
            _.updateGuards.forEach(w => {
              $.push(mt(w, C, F));
            });
          return $.push(p), be($);
        })
        .then(() => {
          $ = [];
          for (const _ of h)
            if (_.beforeEnter)
              if (ze(_.beforeEnter))
                for (const w of _.beforeEnter) $.push(mt(w, C, F));
              else $.push(mt(_.beforeEnter, C, F));
          return $.push(p), be($);
        })
        .then(
          () => (
            C.matched.forEach(_ => (_.enterCallbacks = {})),
            ($ = rs(h, 'beforeRouteEnter', C, F)),
            $.push(p),
            be($)
          )
        )
        .then(() => {
          $ = [];
          for (const _ of i.list()) $.push(mt(_, C, F));
          return $.push(p), be($);
        })
        .catch(_ => (et(_, 8) ? _ : Promise.reject(_)))
    );
  }
  function Q(C, F, $) {
    l.list().forEach(W => B(() => W(C, F, $)));
  }
  function M(C, F, $, W, se) {
    const h = y(C, F);
    if (h) return h;
    const p = F === Xe,
      _ = Bt ? history.state : {};
    $ &&
      (W || p
        ? s.replace(C.fullPath, oe({ scroll: p && _ && _.scroll }, se))
        : s.push(C.fullPath, se)),
      (a.value = C),
      Je(C, F, $, p),
      lt();
  }
  let z;
  function ae() {
    z ||
      (z = s.listen((C, F, $) => {
        if (!qn.listening) return;
        const W = x(C),
          se = I(W);
        if (se) {
          L(oe(se, { replace: !0 }), W).catch(En);
          return;
        }
        u = W;
        const h = a.value;
        Bt && zh(yi(h.fullPath, $.delta), Dr()),
          N(W, h)
            .catch(p =>
              et(p, 12)
                ? p
                : et(p, 2)
                ? (L(p.to, W)
                    .then(_ => {
                      et(_, 20) &&
                        !$.delta &&
                        $.type === Hn.pop &&
                        s.go(-1, !1);
                    })
                    .catch(En),
                  Promise.reject())
                : ($.delta && s.go(-$.delta, !1), K(p, W, h))
            )
            .then(p => {
              (p = p || M(W, h, !1)),
                p &&
                  ($.delta && !et(p, 8)
                    ? s.go(-$.delta, !1)
                    : $.type === Hn.pop && et(p, 20) && s.go(-1, !1)),
                Q(W, h, p);
            })
            .catch(En);
      }));
  }
  let le = hn(),
    U = hn(),
    Z;
  function K(C, F, $) {
    lt(C);
    const W = U.list();
    return (
      W.length ? W.forEach(se => se(C, F, $)) : console.error(C),
      Promise.reject(C)
    );
  }
  function Be() {
    return Z && a.value !== Xe
      ? Promise.resolve()
      : new Promise((C, F) => {
          le.add([C, F]);
        });
  }
  function lt(C) {
    return (
      Z ||
        ((Z = !C),
        ae(),
        le.list().forEach(([F, $]) => (C ? $(C) : F())),
        le.reset()),
      C
    );
  }
  function Je(C, F, $, W) {
    const { scrollBehavior: se } = e;
    if (!Bt || !se) return Promise.resolve();
    const h =
      (!$ && Jh(yi(C.fullPath, 0))) ||
      ((W || !$) && history.state && history.state.scroll) ||
      null;
    return Ht()
      .then(() => se(C, F, h))
      .then(p => p && Vh(p))
      .catch(p => K(p, C, F));
  }
  const Ce = C => s.go(C);
  let $t;
  const Lt = new Set(),
    qn = {
      currentRoute: a,
      listening: !0,
      addRoute: g,
      removeRoute: v,
      hasRoute: A,
      getRoutes: E,
      resolve: x,
      options: e,
      push: m,
      replace: T,
      go: Ce,
      back: () => Ce(-1),
      forward: () => Ce(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: l.add,
      onError: U.add,
      isReady: Be,
      install(C) {
        const F = this;
        C.component('RouterLink', Op),
          C.component('RouterView', Oa),
          (C.config.globalProperties.$router = F),
          Object.defineProperty(C.config.globalProperties, '$route', {
            enumerable: !0,
            get: () => te(a)
          }),
          Bt &&
            !$t &&
            a.value === Xe &&
            (($t = !0), m(s.location).catch(se => {}));
        const $ = {};
        for (const se in Xe)
          Object.defineProperty($, se, {
            get: () => a.value[se],
            enumerable: !0
          });
        C.provide(ao, F), C.provide(Sa, jn($)), C.provide(Os, a);
        const W = C.unmount;
        Lt.add(C),
          (C.unmount = function () {
            Lt.delete(C),
              Lt.size < 1 &&
                ((u = Xe),
                z && z(),
                (z = null),
                (a.value = Xe),
                ($t = !1),
                (Z = !1)),
              W();
          });
      }
    };
  function be(C) {
    return C.reduce((F, $) => F.then(() => B($)), Promise.resolve());
  }
  return qn;
}
function Lp(e, t) {
  const n = [],
    r = [],
    s = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find(u => tn(u, l)) ? r.push(l) : n.push(l));
    const a = e.matched[i];
    a && (t.matched.find(u => tn(u, a)) || s.push(a));
  }
  return [n, r, s];
}
const Oi = [
    {
      name: 'Digital',
      path: '/Digital',
      meta: {},
      alias: [],
      redirect: void 0,
      component: () =>
        kt(
          () => import('./Digital.dcc47716.js'),
          [
            './Digital.dcc47716.js',
            './index.a42229d1.js',
            './book--disable.419feed4.js'
          ],
          import.meta.url
        ).then(e => e.default || e)
    },
    {
      name: 'Emperor',
      path: '/Emperor',
      meta: {},
      alias: [],
      redirect: void 0,
      component: () =>
        kt(
          () => import('./Emperor.845dfd5e.js'),
          [
            './Emperor.845dfd5e.js',
            './index.a42229d1.js',
            './book--disable.419feed4.js'
          ],
          import.meta.url
        ).then(e => e.default || e)
    },
    {
      name: 'Future',
      path: '/Future',
      meta: {},
      alias: [],
      redirect: void 0,
      component: () =>
        kt(
          () => import('./Future.c43a044f.js'),
          [
            './Future.c43a044f.js',
            './index.a42229d1.js',
            './book--disable.419feed4.js'
          ],
          import.meta.url
        ).then(e => e.default || e)
    },
    {
      name: 'home',
      path: '/home',
      meta: {},
      alias: [],
      redirect: void 0,
      component: () =>
        kt(
          () => import('./home.f9b9e814.js'),
          ['./home.f9b9e814.js', './index.a42229d1.js'],
          import.meta.url
        ).then(e => e.default || e)
    },
    {
      name: 'Sustain',
      path: '/Sustain',
      meta: {},
      alias: [],
      redirect: void 0,
      component: () =>
        kt(
          () => import('./Sustain.b926e546.js'),
          [
            './Sustain.b926e546.js',
            './index.a42229d1.js',
            './book--disable.419feed4.js'
          ],
          import.meta.url
        ).then(e => e.default || e)
    }
  ],
  Np = (e, t, n) => (
    (t = t === !0 ? {} : t),
    {
      default: () => {
        var r;
        return t ? Ve(e, t, n) : (r = n.default) == null ? void 0 : r.call(n);
      }
    }
  );
function Ii(e) {
  const t =
    (e == null ? void 0 : e.meta.key) ??
    e.path
      .replace(/(:\w+)\([^)]+\)/g, '$1')
      .replace(/(:\w+)[?+*]/g, '$1')
      .replace(/:\w+/g, n => {
        var r;
        return (
          ((r = e.params[n.slice(1)]) == null ? void 0 : r.toString()) || ''
        );
      });
  return typeof t == 'function' ? t(e) : t;
}
function jp(e, t) {
  return e === t
    ? !1
    : Ii(e) !== Ii(t)
    ? !0
    : !e.matched.every((r, s) => {
        var o, i;
        return (
          r.components &&
          r.components.default ===
            ((i = (o = t.matched[s]) == null ? void 0 : o.components) == null
              ? void 0
              : i.default)
        );
      });
}
const Fp = {
  scrollBehavior(e, t, n) {
    var u;
    const r = de(),
      s =
        ((u = it().options) == null ? void 0 : u.scrollBehaviorType) ?? 'auto';
    let o = n || void 0;
    const i =
      typeof e.meta.scrollToTop == 'function'
        ? e.meta.scrollToTop(e, t)
        : e.meta.scrollToTop;
    if (
      (!o && t && e && i !== !1 && jp(e, t) && (o = { left: 0, top: 0 }),
      e.path === t.path)
    ) {
      if (t.hash && !e.hash) return { left: 0, top: 0 };
      if (e.hash) return { el: e.hash, top: Mi(e.hash), behavior: s };
    }
    const l = c => !!(c.meta.pageTransition ?? ks),
      a = l(t) && l(e) ? 'page:transition:finish' : 'page:finish';
    return new Promise(c => {
      r.hooks.hookOnce(a, async () => {
        await Ht(),
          e.hash && (o = { el: e.hash, top: Mi(e.hash), behavior: s }),
          c(o);
      });
    });
  }
};
function Mi(e) {
  try {
    const t = document.querySelector(e);
    if (t) return parseFloat(getComputedStyle(t).scrollMarginTop);
  } catch {}
  return 0;
}
const Bp = { hashMode: !0, scrollBehaviorType: 'auto' },
  Te = { ...Bp, ...Fp },
  Dp = async e => {
    var a;
    let t, n;
    if (!((a = e.meta) != null && a.validate)) return;
    const r = de(),
      s = it();
    if (
      (([t, n] = Mn(() => Promise.resolve(e.meta.validate(e)))),
      (t = await t),
      n(),
      t) === !0
    )
      return;
    const i = io({
        statusCode: 404,
        statusMessage: `Page Not Found: ${e.fullPath}`
      }),
      l = s.beforeResolve(u => {
        if ((l(), u === e)) {
          const c = s.afterEach(async () => {
            c(),
              await r.runWithContext(() => Dt(i)),
              window.history.pushState({}, '', e.fullPath);
          });
          return !1;
        }
      });
  },
  Up = async e => {
    let t, n;
    const r = (([t, n] = Mn(() => ma(e.path))), (t = await t), n(), t);
    if (r.redirect) return r.redirect;
  },
  Kp = [Dp, Up],
  Tn = {};
function Wp(e, t, n) {
  const { pathname: r, search: s, hash: o } = t,
    i = e.indexOf('#');
  if (i > -1) {
    const u = o.includes(e.slice(i)) ? e.slice(i).length : 1;
    let c = o.slice(u);
    return c[0] !== '/' && (c = '/' + c), ei(c, '');
  }
  const l = ei(r, e),
    a = !n || Af(l, n, { trailingSlash: !0 }) ? l : n;
  return a + (a.includes('?') ? '' : s) + o;
}
const qp = wt({
    name: 'nuxt:router',
    enforce: 'pre',
    async setup(e) {
      var E, A;
      let t,
        n,
        r = Nr().app.baseURL;
      Te.hashMode && !r.includes('#') && (r += '#');
      const s =
          ((E = Te.history) == null ? void 0 : E.call(Te, r)) ??
          (Te.hashMode ? Zh(r) : wa(r)),
        o = ((A = Te.routes) == null ? void 0 : A.call(Te, Oi)) ?? Oi;
      let i;
      const l = Wp(r, window.location, e.payload.path),
        a = $p({
          ...Te,
          scrollBehavior: (x, b, y) => {
            var m;
            if (b === Xe) {
              i = y;
              return;
            }
            return (
              (a.options.scrollBehavior = Te.scrollBehavior),
              (m = Te.scrollBehavior) == null
                ? void 0
                : m.call(Te, x, Xe, i || y)
            );
          },
          history: s,
          routes: o
        });
      e.vueApp.use(a);
      const u = xn(a.currentRoute.value);
      a.afterEach((x, b) => {
        u.value = b;
      }),
        Object.defineProperty(
          e.vueApp.config.globalProperties,
          'previousRoute',
          { get: () => u.value }
        );
      const c = xn(a.resolve(l)),
        f = () => {
          c.value = a.currentRoute.value;
        };
      e.hook('page:finish', f),
        a.afterEach((x, b) => {
          var y, m, T, I;
          ((m = (y = x.matched[0]) == null ? void 0 : y.components) == null
            ? void 0
            : m.default) ===
            ((I = (T = b.matched[0]) == null ? void 0 : T.components) == null
              ? void 0
              : I.default) && f();
        });
      const d = {};
      for (const x in c.value)
        Object.defineProperty(d, x, { get: () => c.value[x] });
      (e._route = jn(d)),
        (e._middleware = e._middleware || { global: [], named: {} });
      const g = Fr();
      try {
        ([t, n] = Mn(() => a.isReady())), await t, n();
      } catch (x) {
        ([t, n] = Mn(() => e.runWithContext(() => Dt(x)))), await t, n();
      }
      const v = e.payload.state._layout;
      return (
        a.beforeEach(async (x, b) => {
          var y;
          (x.meta = rt(x.meta)),
            e.isHydrating && v && !Mt(x.meta.layout) && (x.meta.layout = v),
            (e._processingMiddleware = !0);
          {
            const m = new Set([...Kp, ...e._middleware.global]);
            for (const T of x.matched) {
              const I = T.meta.middleware;
              if (I)
                if (Array.isArray(I)) for (const L of I) m.add(L);
                else m.add(I);
            }
            for (const T of m) {
              const I =
                typeof T == 'string'
                  ? e._middleware.named[T] ||
                    (await ((y = Tn[T]) == null
                      ? void 0
                      : y.call(Tn).then(S => S.default || S)))
                  : T;
              if (!I) throw new Error(`Unknown route middleware: '${T}'.`);
              const L = await e.runWithContext(() => I(x, b));
              if (
                !e.payload.serverRendered &&
                e.isHydrating &&
                (L === !1 || L instanceof Error)
              ) {
                const S =
                  L ||
                  xs({
                    statusCode: 404,
                    statusMessage: `Page Not Found: ${l}`
                  });
                return await e.runWithContext(() => Dt(S)), !1;
              }
              if (L !== !0 && (L || L === !1)) return L;
            }
          }
        }),
        a.onError(() => {
          delete e._processingMiddleware;
        }),
        a.afterEach(async (x, b, y) => {
          delete e._processingMiddleware,
            !e.isHydrating && g.value && (await e.runWithContext(yh)),
            x.matched.length === 0 &&
              (await e.runWithContext(() =>
                Dt(
                  xs({
                    statusCode: 404,
                    fatal: !1,
                    statusMessage: `Page not found: ${x.fullPath}`
                  })
                )
              ));
        }),
        e.hooks.hookOnce('app:created', async () => {
          try {
            await a.replace({ ...a.resolve(l), name: void 0, force: !0 }),
              (a.options.scrollBehavior = Te.scrollBehavior);
          } catch (x) {
            await e.runWithContext(() => Dt(x));
          }
        }),
        { provide: { router: a } }
      );
    }
  }),
  Is =
    globalThis.requestIdleCallback ||
    (e => {
      const t = Date.now(),
        n = {
          didTimeout: !1,
          timeRemaining: () => Math.max(0, 50 - (Date.now() - t))
        };
      return setTimeout(() => {
        e(n);
      }, 1);
    }),
  Vp =
    globalThis.cancelIdleCallback ||
    (e => {
      clearTimeout(e);
    }),
  co = e => {
    const t = de();
    t.isHydrating
      ? t.hooks.hookOnce('app:suspense:resolve', () => {
          Is(e);
        })
      : Is(e);
  },
  zp = wt({
    name: 'nuxt:payload',
    setup(e) {
      it().beforeResolve(async (t, n) => {
        if (t.path === n.path) return;
        const r = await di(t.path);
        r && Object.assign(e.static.data, r.data);
      }),
        co(() => {
          var t;
          e.hooks.hook('link:prefetch', async n => {
            Wn(n).protocol || (await di(n));
          }),
            ((t = navigator.connection) == null ? void 0 : t.effectiveType) !==
              'slow-2g' && setTimeout(Br, 1e3);
        });
    }
  }),
  Jp = wt({ name: 'nuxt:global-components' }),
  rr = {},
  Qp = wt({
    name: 'nuxt:prefetch',
    setup(e) {
      const t = it();
      e.hooks.hook('app:mounted', () => {
        t.beforeEach(async n => {
          var s;
          const r =
            (s = n == null ? void 0 : n.meta) == null ? void 0 : s.layout;
          r && typeof rr[r] == 'function' && (await rr[r]());
        });
      }),
        e.hooks.hook('link:prefetch', n => {
          var i, l, a, u;
          if (an(n)) return;
          const r = t.resolve(n);
          if (!r) return;
          const s =
            (i = r == null ? void 0 : r.meta) == null ? void 0 : i.layout;
          let o = Array.isArray(
            (l = r == null ? void 0 : r.meta) == null ? void 0 : l.middleware
          )
            ? (a = r == null ? void 0 : r.meta) == null
              ? void 0
              : a.middleware
            : [
                (u = r == null ? void 0 : r.meta) == null
                  ? void 0
                  : u.middleware
              ];
          o = o.filter(c => typeof c == 'string');
          for (const c of o) typeof Tn[c] == 'function' && Tn[c]();
          s && typeof rr[s] == 'function' && rr[s]();
        });
    }
  });
function Xp(e = {}) {
  const t = e.path || window.location.pathname;
  let n = {};
  try {
    n = br(sessionStorage.getItem('nuxt:reload') || '{}');
  } catch {}
  if (
    e.force ||
    (n == null ? void 0 : n.path) !== t ||
    (n == null ? void 0 : n.expires) < Date.now()
  ) {
    try {
      sessionStorage.setItem(
        'nuxt:reload',
        JSON.stringify({ path: t, expires: Date.now() + (e.ttl ?? 1e4) })
      );
    } catch {}
    if (e.persistState)
      try {
        sessionStorage.setItem(
          'nuxt:reload:state',
          JSON.stringify({ state: de().payload.state })
        );
      } catch {}
    window.location.pathname !== t
      ? (window.location.href = t)
      : window.location.reload();
  }
}
const Yp = wt({
    name: 'nuxt:chunk-reload',
    setup(e) {
      const t = it(),
        n = Nr(),
        r = new Set();
      t.beforeEach(() => {
        r.clear();
      }),
        e.hook('app:chunkError', ({ error: o }) => {
          r.add(o);
        });
      function s(o) {
        const l =
          'href' in o && o.href.startsWith('#')
            ? n.app.baseURL + o.href
            : cn(n.app.baseURL, o.fullPath);
        Xp({ path: l, persistState: !0 });
      }
      e.hook('app:manifest:update', () => {
        t.beforeResolve(s);
      }),
        t.onError((o, i) => {
          r.has(o) && s(i);
        });
    }
  }),
  Zp = wt(e => {
    let t;
    async function n() {
      const r = await Br();
      t && clearTimeout(t), (t = setTimeout(n, 1e3 * 60 * 60));
      const s = await $fetch(ro('builds/latest.json'));
      s.id !== r.id && e.hooks.callHook('app:manifest:update', s);
    }
    co(() => {
      t = setTimeout(n, 1e3 * 60 * 60);
    });
  }),
  Gp = [Ih, Hh, qp, zp, Jp, Qp, Yp, Zp],
  eg = (e, t) =>
    t.path
      .replace(/(:\w+)\([^)]+\)/g, '$1')
      .replace(/(:\w+)[?+*]/g, '$1')
      .replace(/:\w+/g, n => {
        var r;
        return (
          ((r = e.params[n.slice(1)]) == null ? void 0 : r.toString()) || ''
        );
      }),
  Ms = (e, t) => {
    const n = e.route.matched.find(s => {
        var o;
        return (
          ((o = s.components) == null ? void 0 : o.default) === e.Component.type
        );
      }),
      r = t ?? (n == null ? void 0 : n.meta.key) ?? (n && eg(e.route, n));
    return typeof r == 'function' ? r(e.route) : r;
  },
  tg = (e, t) => ({ default: () => (e ? Ve(Yc, e === !0 ? {} : e, t) : t) }),
  ng = bt({
    name: 'RouteProvider',
    props: {
      vnode: { type: Object, required: !0 },
      route: { type: Object, required: !0 },
      vnodeRef: Object,
      renderKey: String,
      trackRootNodes: Boolean
    },
    setup(e) {
      const t = e.renderKey,
        n = e.route,
        r = {};
      for (const s in e.route)
        Object.defineProperty(r, s, {
          get: () => (t === e.renderKey ? e.route[s] : n[s])
        });
      return Qt(jr, jn(r)), () => Ve(e.vnode, { ref: e.vnodeRef });
    }
  }),
  rg = bt({
    name: 'NuxtPage',
    inheritAttrs: !1,
    props: {
      name: { type: String },
      transition: { type: [Boolean, Object], default: void 0 },
      keepalive: { type: [Boolean, Object], default: void 0 },
      route: { type: Object },
      pageKey: { type: [Function, String], default: null }
    },
    setup(e, { attrs: t, expose: n }) {
      const r = de(),
        s = Ie(),
        o = Me(jr, null);
      n({ pageRef: s });
      const i = Me(mh, null);
      let l;
      const a = r.deferHydration();
      return () =>
        Ve(
          Oa,
          { name: e.name, route: e.route, ...t },
          {
            default: u => {
              const c = ig(o, u.route, u.Component),
                f = o && o.matched.length === u.route.matched.length;
              if (!u.Component) {
                if (l && !f) return l;
                a();
                return;
              }
              if (l && i && !i.isCurrent(u.route)) return l;
              if (c && o && (!i || (i != null && i.isCurrent(o))))
                return f ? l : null;
              const d = Ms(u, e.pageKey),
                g = !!(e.transition ?? u.route.meta.pageTransition ?? ks),
                v =
                  g &&
                  og(
                    [
                      e.transition,
                      u.route.meta.pageTransition,
                      ks,
                      {
                        onAfterLeave: () => {
                          r.callHook('page:transition:finish', u.Component);
                        }
                      }
                    ].filter(Boolean)
                  );
              return (
                (l = Np(
                  Gs,
                  g && v,
                  tg(
                    e.keepalive ?? u.route.meta.keepalive ?? Th,
                    Ve(
                      gl,
                      {
                        suspensible: !0,
                        onPending: () => r.callHook('page:start', u.Component),
                        onResolve: () => {
                          Ht(() =>
                            r.callHook('page:finish', u.Component).finally(a)
                          );
                        }
                      },
                      {
                        default: () =>
                          Ve(ng, {
                            key: d || void 0,
                            vnode: u.Component,
                            route: u.route,
                            renderKey: d || void 0,
                            trackRootNodes: g,
                            vnodeRef: s
                          })
                      }
                    )
                  )
                ).default()),
                l
              );
            }
          }
        );
    }
  });
function sg(e) {
  return Array.isArray(e) ? e : e ? [e] : [];
}
function og(e) {
  const t = e.map(n => ({ ...n, onAfterLeave: sg(n.onAfterLeave) }));
  return da(...t);
}
function ig(e, t, n) {
  if (!e) return !1;
  const r = t.matched.findIndex(s => {
    var o;
    return (
      ((o = s.components) == null ? void 0 : o.default) ===
      (n == null ? void 0 : n.type)
    );
  });
  return !r || r === -1
    ? !1
    : t.matched.slice(0, r).some((s, o) => {
        var i, l, a;
        return (
          ((i = s.components) == null ? void 0 : i.default) !==
          ((a = (l = e.matched[o]) == null ? void 0 : l.components) == null
            ? void 0
            : a.default)
        );
      }) ||
        (n &&
          Ms({ route: t, Component: n }) !== Ms({ route: e, Component: n }));
}
const Ia = '' + globalThis.__publicAssetsURL('webp/logo.webp'),
  uo = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  lg = {},
  ag = { class: 'logo', src: Ia };
function cg(e, t) {
  return Le(), Un('img', ag);
}
const ug = uo(lg, [['render', cg]]);
async function Ma(e, t = it()) {
  const { path: n, matched: r } = t.resolve(e);
  if (
    !r.length ||
    (t._routePreloaded || (t._routePreloaded = new Set()),
    t._routePreloaded.has(n))
  )
    return;
  const s = (t._preloadPromises = t._preloadPromises || []);
  if (s.length > 4) return Promise.all(s).then(() => Ma(e, t));
  t._routePreloaded.add(n);
  const o = r
    .map(i => {
      var l;
      return (l = i.components) == null ? void 0 : l.default;
    })
    .filter(i => typeof i == 'function');
  for (const i of o) {
    const l = Promise.resolve(i())
      .catch(() => {})
      .finally(() => s.splice(s.indexOf(l)));
    s.push(l);
  }
  await Promise.all(s);
}
const fg = (...e) => e.find(t => t !== void 0),
  dg = 'noopener noreferrer';
/*! @__NO_SIDE_EFFECTS__ */ function hg(e) {
  const t = e.componentName || 'NuxtLink',
    n = (r, s) => {
      if (!r || (e.trailingSlash !== 'append' && e.trailingSlash !== 'remove'))
        return r;
      const o = e.trailingSlash === 'append' ? _r : no;
      if (typeof r == 'string') return o(r, !0);
      const i = 'path' in r ? r.path : s(r).path;
      return { ...r, name: void 0, path: o(i, !0) };
    };
  return bt({
    name: t,
    props: {
      to: { type: [String, Object], default: void 0, required: !1 },
      href: { type: [String, Object], default: void 0, required: !1 },
      target: { type: String, default: void 0, required: !1 },
      rel: { type: String, default: void 0, required: !1 },
      noRel: { type: Boolean, default: void 0, required: !1 },
      prefetch: { type: Boolean, default: void 0, required: !1 },
      noPrefetch: { type: Boolean, default: void 0, required: !1 },
      activeClass: { type: String, default: void 0, required: !1 },
      exactActiveClass: { type: String, default: void 0, required: !1 },
      prefetchedClass: { type: String, default: void 0, required: !1 },
      replace: { type: Boolean, default: void 0, required: !1 },
      ariaCurrentValue: { type: String, default: void 0, required: !1 },
      external: { type: Boolean, default: void 0, required: !1 },
      custom: { type: Boolean, default: void 0, required: !1 }
    },
    setup(r, { slots: s }) {
      const o = it(),
        i = Nr(),
        l = xe(() => {
          const g = r.to || r.href || '';
          return n(g, o.resolve);
        }),
        a = xe(
          () =>
            typeof l.value == 'string' && an(l.value, { acceptRelative: !0 })
        ),
        u = xe(() =>
          r.external || (r.target && r.target !== '_self')
            ? !0
            : typeof l.value == 'object'
            ? !1
            : l.value === '' || a.value
        ),
        c = Ie(!1),
        f = Ie(null),
        d = g => {
          var v;
          f.value = r.custom
            ? (v = g == null ? void 0 : g.$el) == null
              ? void 0
              : v.nextElementSibling
            : g == null
            ? void 0
            : g.$el;
        };
      if (
        r.prefetch !== !1 &&
        r.noPrefetch !== !0 &&
        r.target !== '_blank' &&
        !mg()
      ) {
        const v = de();
        let E,
          A = null;
        Bn(() => {
          const x = gg();
          co(() => {
            E = Is(() => {
              var b;
              (b = f == null ? void 0 : f.value) != null &&
                b.tagName &&
                (A = x.observe(f.value, async () => {
                  A == null || A(), (A = null);
                  const y =
                    typeof l.value == 'string'
                      ? l.value
                      : o.resolve(l.value).fullPath;
                  await Promise.all([
                    v.hooks.callHook('link:prefetch', y).catch(() => {}),
                    !u.value && Ma(l.value, o).catch(() => {})
                  ]),
                    (c.value = !0);
                }));
            });
          });
        }),
          Dn(() => {
            E && Vp(E), A == null || A(), (A = null);
          });
      }
      return () => {
        var x, b;
        if (!u.value) {
          const y = {
            ref: d,
            to: l.value,
            activeClass: r.activeClass || e.activeClass,
            exactActiveClass: r.exactActiveClass || e.exactActiveClass,
            replace: r.replace,
            ariaCurrentValue: r.ariaCurrentValue,
            custom: r.custom
          };
          return (
            r.custom ||
              (c.value && (y.class = r.prefetchedClass || e.prefetchedClass),
              (y.rel = r.rel)),
            Ve(Nc('RouterLink'), y, s.default)
          );
        }
        const g =
            typeof l.value == 'object'
              ? ((x = o.resolve(l.value)) == null ? void 0 : x.href) ?? null
              : l.value && !r.external && !a.value
              ? n(cn(i.app.baseURL, l.value), o.resolve)
              : l.value || null,
          v = r.target || null,
          E = r.noRel
            ? null
            : fg(r.rel, e.externalRelAttribute, g ? dg : '') || null,
          A = () => bh(g, { replace: r.replace });
        return r.custom
          ? s.default
            ? s.default({
                href: g,
                navigate: A,
                get route() {
                  if (!g) return;
                  const y = Wn(g);
                  return {
                    path: y.pathname,
                    fullPath: y.pathname,
                    get query() {
                      return Jl(y.search);
                    },
                    hash: y.hash,
                    params: {},
                    name: void 0,
                    matched: [],
                    redirectedFrom: void 0,
                    meta: {},
                    href: g
                  };
                },
                rel: E,
                target: v,
                isExternal: u.value,
                isActive: !1,
                isExactActive: !1
              })
            : null
          : Ve(
              'a',
              { ref: f, href: g, rel: E, target: v },
              (b = s.default) == null ? void 0 : b.call(s)
            );
      };
    }
  });
}
const pg = hg(Rh);
function gg() {
  const e = de();
  if (e._observer) return e._observer;
  let t = null;
  const n = new Map(),
    r = (o, i) => (
      t ||
        (t = new IntersectionObserver(l => {
          for (const a of l) {
            const u = n.get(a.target);
            (a.isIntersecting || a.intersectionRatio > 0) && u && u();
          }
        })),
      n.set(o, i),
      t.observe(o),
      () => {
        n.delete(o),
          t.unobserve(o),
          n.size === 0 && (t.disconnect(), (t = null));
      }
    );
  return (e._observer = { observe: r });
}
function mg() {
  const e = navigator.connection;
  return !!(e && (e.saveData || /2g/.test(e.effectiveType)));
}
function Jg(e) {
  return Wi() ? (Za(e), !0) : !1;
}
function $n(e) {
  return typeof e == 'function' ? e() : te(e);
}
const yg = typeof window < 'u' && typeof document < 'u';
typeof WorkerGlobalScope < 'u' && globalThis instanceof WorkerGlobalScope;
const _g = Object.prototype.toString,
  Qg = e => _g.call(e) === '[object Object]',
  Rr = () => {},
  Xg = vg();
function vg() {
  var e;
  return (
    yg &&
    ((e = window == null ? void 0 : window.navigator) == null
      ? void 0
      : e.userAgent) &&
    /iP(ad|hone|od)/.test(window.navigator.userAgent)
  );
}
function Ha(e, t) {
  function n(...r) {
    return new Promise((s, o) => {
      Promise.resolve(
        e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })
      )
        .then(s)
        .catch(o);
    });
  }
  return n;
}
function bg(e, t = {}) {
  let n,
    r,
    s = Rr;
  const o = l => {
    clearTimeout(l), s(), (s = Rr);
  };
  return l => {
    const a = $n(e),
      u = $n(t.maxWait);
    return (
      n && o(n),
      a <= 0 || (u !== void 0 && u <= 0)
        ? (r && (o(r), (r = null)), Promise.resolve(l()))
        : new Promise((c, f) => {
            (s = t.rejectOnCancel ? f : c),
              u &&
                !r &&
                (r = setTimeout(() => {
                  n && o(n), (r = null), c(l());
                }, u)),
              (n = setTimeout(() => {
                r && o(r), (r = null), c(l());
              }, a));
          })
    );
  };
}
function wg(e, t = !0, n = !0, r = !1) {
  let s = 0,
    o,
    i = !0,
    l = Rr,
    a;
  const u = () => {
    o && (clearTimeout(o), (o = void 0), l(), (l = Rr));
  };
  return f => {
    const d = $n(e),
      g = Date.now() - s,
      v = () => (a = f());
    return (
      u(),
      d <= 0
        ? ((s = Date.now()), v())
        : (g > d && (n || !i)
            ? ((s = Date.now()), v())
            : t &&
              (a = new Promise((E, A) => {
                (l = r ? A : E),
                  (o = setTimeout(() => {
                    (s = Date.now()), (i = !0), E(v()), u();
                  }, Math.max(0, d - g)));
              })),
          !n && !o && (o = setTimeout(() => (i = !0), d)),
          (i = !1),
          a)
    );
  };
}
function Yg(e, t = 200, n = {}) {
  return Ha(bg(t, n), e);
}
function Zg(e, t = 200, n = !1, r = !0, s = !1) {
  return Ha(wg(t, n, r, s), e);
}
function Gg(e, t = !0) {
  Kn() ? Bn(e) : t ? e() : Ht(e);
}
function Eg(e = !1, t = {}) {
  const { truthyValue: n = !0, falsyValue: r = !1 } = t,
    s = ye(e),
    o = Ie(e);
  function i(l) {
    if (arguments.length) return (o.value = l), o.value;
    {
      const a = $n(n);
      return (o.value = o.value === a ? $n(r) : a), o.value;
    }
  }
  return s ? i : [o, i];
}
const Cg = '' + globalThis.__publicAssetsURL('webp/iconHome.webp'),
  Tg = { class: 'menu__list' },
  Rg = { class: 'menu__bottom' },
  xg = me('img', { class: 'menu__icon', src: Cg, alt: 'home' }, null, -1),
  Pg = me('div', { class: 'menu__logo' }, [me('img', { src: Ia })], -1),
  kg = { class: 'menu__btnBox' },
  Ag = bt({
    __name: 'Menu',
    setup(e) {
      const [t, n] = Eg();
      return (r, s) => {
        const o = pg;
        return (
          Le(),
          Un(
            Oe,
            null,
            [
              me(
                'div',
                {
                  class: Xt(['menu__wrapper', { 'menu__wrapper--open': te(t) }])
                },
                [
                  me('ul', Tg, [
                    me(
                      'li',
                      {
                        class: 'menu__item',
                        onClick: s[0] || (s[0] = i => te(n)())
                      },
                      [
                        re(
                          o,
                          { class: 'menu__itemText', to: '/digital' },
                          { default: ht(() => [Ue('數位創新')]), _: 1 }
                        )
                      ]
                    ),
                    me(
                      'li',
                      {
                        class: 'menu__item',
                        onClick: s[1] || (s[1] = i => te(n)())
                      },
                      [
                        re(
                          o,
                          { class: 'menu__itemText', to: '/emperor' },
                          { default: ht(() => [Ue('韌性企業')]), _: 1 }
                        )
                      ]
                    ),
                    me(
                      'li',
                      {
                        class: 'menu__item',
                        onClick: s[2] || (s[2] = i => te(n)())
                      },
                      [
                        re(
                          o,
                          { class: 'menu__itemText', to: '/sustain' },
                          { default: ht(() => [Ue('永續淨零')]), _: 1 }
                        )
                      ]
                    ),
                    me(
                      'li',
                      {
                        class: 'menu__item',
                        onClick: s[3] || (s[3] = i => te(n)())
                      },
                      [
                        re(
                          o,
                          { class: 'menu__itemText', to: '/future' },
                          { default: ht(() => [Ue('未來社會')]), _: 1 }
                        )
                      ]
                    ),
                    me(
                      'li',
                      {
                        class: 'menu__item',
                        onClick: s[4] || (s[4] = i => te(n)())
                      },
                      [
                        re(
                          o,
                          { class: 'menu__itemText', to: '/' },
                          { default: ht(() => [Ue('關鍵字 Podcast')]), _: 1 }
                        )
                      ]
                    )
                  ]),
                  me('div', Rg, [
                    me(
                      'div',
                      {
                        class: 'menu__item',
                        onClick: s[5] || (s[5] = i => te(n)())
                      },
                      [
                        re(
                          o,
                          { class: 'menu__itemText', to: '/home' },
                          { default: ht(() => [xg, Ue(' 回到首頁 ')]), _: 1 }
                        )
                      ]
                    ),
                    Pg
                  ])
                ],
                2
              ),
              me('div', kg, [
                re(o, { class: 'menu__btn menu__home', to: '/home' }),
                me(
                  'div',
                  {
                    class: Xt(['menu__btn', { 'menu__btn--open': te(t) }]),
                    onClick: s[6] || (s[6] = i => te(n)())
                  },
                  null,
                  2
                )
              ])
            ],
            64
          )
        );
      };
    }
  }),
  Sg = {},
  Og = { class: 'header' };
function Ig(e, t) {
  const n = ug,
    r = Ag;
  return Le(), Un('div', Og, [re(n), re(r)]);
}
const Mg = uo(Sg, [['render', Ig]]),
  Hg = {},
  $g = { class: 'footer flex justify-center' },
  Lg = me(
    'p',
    { class: 'text-center' },
    [
      Ue(' 建議使用 Chrome、Firefox、Safari 瀏覽器 Copyright © 2023 '),
      me('br', { class: 'sm:hidden block' }),
      Ue(' 天下數位發展中心廣告企劃製作 All rights reserved. '),
      me('br', { class: 'sm:hidden block' }),
      Ue(' 版權所有，禁止擅自轉貼節錄 | 隱私權政策 ')
    ],
    -1
  ),
  Ng = [Lg];
function jg(e, t) {
  return Le(), Un('div', $g, Ng);
}
const Fg = uo(Hg, [['render', jg]]),
  Bg = { class: 'wrapper' },
  Dg = bt({
    __name: 'app',
    setup(e) {
      return (
        ih({
          meta: [
            {
              name: 'viewport',
              content:
                'width=375, initial-scale=1, minimum-scale=1, maximum-scale=1'
            }
          ]
        }),
        (t, n) => {
          const r = rg,
            s = Mg,
            o = Fg;
          return Le(), Un('div', Bg, [re(r), re(s), re(o)]);
        }
      );
    }
  });
const Ug = {
    __name: 'nuxt-error-page',
    props: { error: Object },
    setup(e) {
      const n = e.error;
      (n.stack || '')
        .split(
          `
`
        )
        .splice(1)
        .map(f => ({
          text: f.replace('webpack:/', '').replace('.vue', '.js').trim(),
          internal:
            (f.includes('node_modules') && !f.includes('.cache')) ||
            f.includes('internal') ||
            f.includes('new Promise')
        }))
        .map(
          f =>
            `<span class="stack${f.internal ? ' internal' : ''}">${
              f.text
            }</span>`
        ).join(`
`);
      const r = Number(n.statusCode || 500),
        s = r === 404,
        o = n.statusMessage ?? (s ? 'Page Not Found' : 'Internal Server Error'),
        i = n.message || n.toString(),
        l = void 0,
        c = s
          ? ko(() =>
              kt(
                () => import('./error-404.b6f605a7.js'),
                ['./error-404.b6f605a7.js', './error-404.95c28eb4.css'],
                import.meta.url
              ).then(f => f.default || f)
            )
          : ko(() =>
              kt(
                () => import('./error-500.ae26eb54.js'),
                ['./error-500.ae26eb54.js', './error-500.e798523c.css'],
                import.meta.url
              ).then(f => f.default || f)
            );
      return (f, d) => (
        Le(),
        Ft(
          te(c),
          za(
            Dl({
              statusCode: te(r),
              statusMessage: te(o),
              description: te(i),
              stack: te(l)
            })
          ),
          null,
          16
        )
      );
    }
  },
  Hi = {
    __name: 'nuxt-root',
    setup(e) {
      const t = () => null,
        n = de(),
        r = n.deferHydration(),
        s = !1;
      Qt(jr, pa()), n.hooks.callHookWith(l => l.map(a => a()), 'vue:setup');
      const o = Fr();
      xl((l, a, u) => {
        if (
          (n.hooks
            .callHook('vue:error', l, a, u)
            .catch(c => console.error('[nuxt] Error in `vue:error` hook', c)),
          _h(l) && (l.fatal || l.unhandled))
        )
          return n.runWithContext(() => Dt(l)), !1;
      });
      const i = !1;
      return (l, a) => (
        Le(),
        Ft(
          gl,
          { onResolve: te(r) },
          {
            default: ht(() => [
              te(o)
                ? (Le(),
                  Ft(te(Ug), { key: 0, error: te(o) }, null, 8, ['error']))
                : te(i)
                ? (Le(),
                  Ft(te(t), { key: 1, context: te(i) }, null, 8, ['context']))
                : te(s)
                ? (Le(), Ft(jc(te(s)), { key: 2 }))
                : (Le(), Ft(te(Dg), { key: 3 }))
            ]),
            _: 1
          },
          8,
          ['onResolve']
        )
      );
    }
  };
let $i;
{
  let e;
  ($i = async function () {
    var o, i;
    if (e) return e;
    const r = !!(
        ((o = window.__NUXT__) != null && o.serverRendered) ||
        ((i = document.getElementById('__NUXT_DATA__')) == null
          ? void 0
          : i.dataset.ssr) === 'true'
      )
        ? of(Hi)
        : sf(Hi),
      s = ud({ vueApp: r });
    try {
      await dd(s, Gp);
    } catch (l) {
      await s.callHook('app:error', l),
        (s.payload.error = s.payload.error || l);
    }
    try {
      await s.hooks.callHook('app:created', r),
        await s.hooks.callHook('app:beforeMount', r),
        r.mount(xh),
        await s.hooks.callHook('app:mounted', r),
        await Ht();
    } catch (l) {
      await s.callHook('app:error', l),
        (s.payload.error = s.payload.error || l);
    }
    return r;
  }),
    (e = $i().catch(t => {
      console.error('Error while mounting app:', t);
    }));
}
export {
  zt as A,
  Jg as B,
  Zg as C,
  Qg as D,
  Yg as E,
  Gs as T,
  uo as _,
  me as a,
  re as b,
  Un as c,
  Ue as d,
  pg as e,
  qg as f,
  bt as g,
  Eg as h,
  xe as i,
  Vg as j,
  te as k,
  Bn as l,
  Xg as m,
  Xt as n,
  Le as o,
  Wg as p,
  Rr as q,
  Ie as r,
  rt as s,
  Kg as t,
  ih as u,
  zg as v,
  ht as w,
  Gg as x,
  $n as y,
  yg as z
};
