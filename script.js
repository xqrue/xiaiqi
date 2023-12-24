/*!
Happy Holidays 2023
Copyright (c) 2023 by Wakana Y.K. (https://codepen.io/wakana-k/pen/ExrBQKq)
*/
"use strict";
import * as THREE from "three";
import { OrbitControls as e } from "three/addons/controls/OrbitControls.js";

import { RGBELoader as t } from "three/addons/loaders/RGBELoader.js";

import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import { MeshSurfaceSampler as o } from "three/addons/math/MeshSurfaceSampler.js";

import { EffectComposer as n } from "three/addons/postprocessing/EffectComposer.js";

import { RenderPass as r } from "three/addons/postprocessing/RenderPass.js";

import { ShaderPass as a } from "three/addons/postprocessing/ShaderPass.js";

import { UnrealBloomPass as s } from "three/addons/postprocessing/UnrealBloomPass.js";

import { SVGLoader as i } from "three/addons/loaders/SVGLoader.js";

import { Flow as l } from "three/addons/modifiers/CurveModifier.js";

!(function () {
  function d(e, t, o) {
    P = t.length;
    let n,
      r = new THREE.InstancedMesh(x.geometry, x.material, P);
    $.set(0, 0, 0, 0), te.set(1, 1, 1);
    for (let a = 0; a < P; a++) {
      if (
        (J.set(t[a][0], t[a][1], t[a][2]),
        (K = J),
        ("ribbon" != o && "twist" != o) ||
          (V.lookAt(J.x, 0, J.z), ($ = V.quaternion)),
        1 != e && te.set(e, e, e),
        Q.compose(K, $, te),
        "ribbon" == o)
      )
        n = new THREE.Color("red");
      else if ("light" == o || "light2" == o) n = new THREE.Color("burlywood");
      else if ("sphere" == o) {
        let e = ["white", "red"];
        n = new THREE.Color(e[Math.floor(Math.random() * e.length)]);
      }
      r.setMatrixAt(a, Q), r.setColorAt(a, n);
    }
    return r;
  }
  function h(e) {
    /*! this function from https://stackoverflow.com/questions/69025167/threejs-how-can-i-add-tetrahedron-geometry-to-the-surface */
    let t = this.attributes.position;
    if (null != this.index) return;
    let o = t.count / 3,
      n = [],
      r = new THREE.Triangle(),
      a = oe.clone(),
      s = oe.clone(),
      i = oe.clone();
    for (let l = 0; l < o; l++) {
      a.fromBufferAttribute(t, 3 * l + 0),
        s.fromBufferAttribute(t, 3 * l + 1),
        i.fromBufferAttribute(t, 3 * l + 2),
        r.set(a, s, i);
      let o = oe.clone();
      r.getMidpoint(o);
      let d = a.distanceTo(s),
        h = (Math.sqrt(3) / 2) * d * e,
        c = o.clone().normalize().setLength(h);
      o.add(c),
        n.push(
          o.clone(),
          a.clone(),
          s.clone(),
          o.clone(),
          s.clone(),
          i.clone(),
          o.clone(),
          i.clone(),
          a.clone()
        );
    }
    let l = new THREE.BufferGeometry().setFromPoints(n);
    return l.computeVertexNormals(), l;
  }
  function c() {
    const e = window.innerWidth,
      t = window.innerHeight;
    (M.aspect = e / t),
      M.updateProjectionMatrix(),
      w.setSize(e, t),
      Z.setSize(e, t),
      q.setSize(e, t),
      E();
  }
  function u(e) {
    (e.isMesh || e.isInstancedMesh) &&
      !1 === D.test(e.layers) &&
      ((X[e.uuid] = e.material), (e.material = W));
  }
  function m(e) {
    X[e.uuid] && ((e.material = X[e.uuid]), delete X[e.uuid]);
  }
  function p() {
    requestAnimationFrame(p), T.update(), _ && _.moveAlongCurve(7e-4), E();
  }
  function E() {
    O.getElapsedTime() > Y / 1e3 &&
      (v.layers.toggle(L), B.layers.toggle(L), O.stop(), O.start()),
      I &&
        (function (e) {
          for (let t = 0; t < e.count; t++)
            e.getMatrixAt(t, Q),
              Q.decompose(V.position, V.quaternion, V.scale),
              (V.position.y -= F),
              V.position.y < -z
                ? ((V.position.y = z),
                  (V.position.x = THREE.MathUtils.randFloat(-z, z)),
                  (V.position.z = THREE.MathUtils.randFloat(-z, z)))
                : t % 4 == 1
                ? ((V.position.x += j), (V.position.z += k))
                : t % 4 == 2
                ? ((V.position.x += j), (V.position.z -= k))
                : t % 4 == 3
                ? ((V.position.x -= j), (V.position.z += k))
                : ((V.position.x -= j), (V.position.z -= k)),
              (V.rotation.x += THREE.MathUtils.randFloat(0, C)),
              (V.rotation.z += THREE.MathUtils.randFloat(0, A)),
              V.updateMatrix(),
              e.setMatrixAt(t, V.matrix);
          e.instanceMatrix.needsUpdate = !0;
        })(I),
      f.traverse(u),
      Z.render(),
      f.traverse(m),
      q.render();
  }
  let M,
    f,
    w,
    T,
    R,
    g,
    H,
    y,
    b,
    x,
    P,
    v,
    B,
    I,
    S,
    G = 1,
    U = [],
    z = 12;
  const C = Math.PI / 30,
    A = Math.PI / 50,
    F = 0.03,
    j = 0.005,
    k = 0.005,
    V = new THREE.Object3D();
  let Z, q;
  const L = 1,
    D = new THREE.Layers();
  D.set(L);
  const N = {
      exposure: 0,
      bloomStrength: 1,
      bloomThreshold: 0,
      bloomRadius: 0.1
    },
    W = new THREE.MeshBasicMaterial({
      color: "black"
    }),
    X = {},
    Y = 1e3,
    O = new THREE.Clock();
  let _;
  const Q = new THREE.Matrix4();
  let J = new THREE.Vector3(),
    K = J.clone(),
    $ = new THREE.Quaternion();
  const ee = new THREE.Euler(),
    te = J.clone(),
    oe = J.clone();
  !(async function () {
    const u = new t().loadAsync(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/blouberg_sunrise_2_1k.hdr"
    );
    ([b] = await Promise.all([u])),
      (b.mapping = THREE.EquirectangularReflectionMapping);
    const m = document.createElement("div");
    document.body.appendChild(m),
      ((f = new THREE.Scene()).background = "black"),
      (f.environment = b),
      (w = new THREE.WebGLRenderer({
        antialias: !0
      })).setPixelRatio(window.devicePixelRatio),
      w.setSize(window.innerWidth, window.innerHeight),
      (w.toneMapping = THREE.ReinhardToneMapping),
      m.appendChild(w.domElement),
      (M = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.01,
        500
      )).position.set(0, 0.8, 25),
      M.lookAt(0, 0, 0);
    const E = new r(f, M),
      C = new s(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        N.bloomStrength,
        N.bloomRadius,
        N.bloomThreshold
      );
    ((Z = new n(w)).renderToScreen = !1), Z.addPass(E), Z.addPass(C);
    const A = new a(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: {
            value: null
          },
          bloomTexture: {
            value: Z.renderTarget2.texture
          }
        },
        vertexShader: document.getElementById("vertexshader").textContent,
        fragmentShader: document.getElementById("fragmentshader").textContent,
        defines: {}
      }),
      "baseTexture"
    );
    (A.needsSwap = !0),
      (q = new n(w)).addPass(E),
      q.addPass(A),
      (y = new THREE.MeshBasicMaterial({
        color: "white",
        reflectivity: 0.8,
        envMap: b
      })),
      (H = (function () {
        let e;
        (S = 2),
          (P = 700),
          (G = 15),
          (U = []),
          (R = new THREE.PlaneGeometry(0.05, 0.05));
        for (let t = 0; t < P; t++) {
          const t = Math.acos(THREE.MathUtils.randFloatSpread(2)),
            o = THREE.MathUtils.randFloatSpread(360);
          (J.x = S * Math.sin(t) * Math.cos(o)),
            (J.y = Math.abs(S * Math.sin(t) * Math.sin(o)) * G - S * G),
            (J.z = S * Math.cos(t)),
            (e = Math.random()),
            J.copy(J).multiplyScalar(e);
          let n = R.clone();
          n.rotateX(Math.random() * Math.PI),
            n.rotateY(Math.random() * Math.PI),
            n.rotateZ(Math.random() * Math.PI),
            n.translate(J.x, J.y, J.z),
            U.push(n);
        }
        return (
          (R = BufferGeometryUtils.mergeGeometries(U)).rotateZ(-Math.PI / 2),
          (R.attributes.position.needsUpdate = !0),
          R.center(),
          R.computeBoundingBox(),
          R.computeVertexNormals(),
          (g = y.clone()).color.set("khaki"),
          (g.side = THREE.DoubleSide),
          (H = new THREE.Mesh(R, g))
        );
      })());
    let F = (function (e = 1, t = 1, o = 100, n) {
      const r = [];
      for (let a = 0; a <= o; a++)
        (S = e * a),
          ((J = J.clone()).x = S * Math.cos(a)),
          (J.z = S * Math.sin(a)),
          (J.y = t * -a + n),
          r.push(J);
      for (let a = o; a >= 0; a--)
        (S = e * a),
          ((J = J.clone()).x = S * Math.cos(-a)),
          (J.z = S * Math.sin(-a)),
          (J.y = t * -a + n),
          r.push(J);
      return new THREE.CatmullRomCurve3(r, !0, "centripetal", 0);
    })(0.24, 0.2 * 3, 25, 10);
    F.getPoints(25),
      (_ = new l(H)).updateCurve(0, F),
      f.add(_.object3D),
      (function () {
        (P = 128), (G = 0.002);
        const e = document.querySelector("svg#snowflake").outerHTML,
          t = new i().parse(e).paths[0],
          o = i.createShapes(t)[0];
        let n = new THREE.ExtrudeGeometry(o, {
          steps: 1,
          depth: 10,
          bevelEnabled: !0,
          bevelThickness: 0,
          bevelSize: 0,
          bevelOffset: -3,
          bevelSegments: 0
        });
        n.scale(G, G, G),
          (n = BufferGeometryUtils.mergeVertices(n, G / 20)).center(),
          (n.attributes.position.needsUpdate = !0),
          n.computeBoundingBox(),
          n.computeVertexNormals(),
          (g = y.clone()).color.set("white"),
          (g.reflectivity = 0.8),
          (I = new THREE.InstancedMesh(n, g, P)),
          $.set(0, 0, 0, 0),
          te.set(1, 1, 1);
        for (let e = 0; e < P; e++)
          J.set(
            THREE.MathUtils.randFloat(-z, z),
            THREE.MathUtils.randFloat(-z, z),
            THREE.MathUtils.randFloat(-z, z)
          ),
            (K = J),
            ee.set(
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI
            ),
            $.setFromEuler(ee),
            (te.x = te.y = te.z = 0.5 * Math.random() + 0.5),
            Q.compose(K, $, te),
            I.setMatrixAt(e, Q);
        f.add(I);
      })(),
      (R = (function (e, t, o) {
        let n = [];
        for (let r = 0; r < 2 * e; r++) {
          let a, s;
          n.push(0, 0, -o / 2),
            r % 2 == 0 ? ((a = t), (s = 1)) : ((a = 1), (s = t));
          let i = ((r + 1) / e) * Math.PI;
          n.push(Math.cos(i) * a, Math.sin(i) * a, 0),
            (i = (r / e) * Math.PI),
            n.push(Math.cos(i) * s, Math.sin(i) * s, 0),
            n.push(0, 0, o / 2),
            (i = (r / e) * Math.PI),
            n.push(Math.cos(i) * s, Math.sin(i) * s, 0),
            (i = ((r + 1) / e) * Math.PI),
            n.push(Math.cos(i) * a, Math.sin(i) * a, 0);
        }
        return (
          (n = new Float32Array(n)),
          (R = new THREE.BufferGeometry()).setAttribute(
            "position",
            new THREE.BufferAttribute(n, 3)
          ),
          R.rotateZ(-Math.PI / e / 2),
          (R.attributes.position.needsUpdate = !0),
          R.computeVertexNormals(),
          R.center(),
          R
        );
      })(5, 2, 1.78)),
      (g = y.clone()).color.set("yellow"),
      (g.reflectivity = 1);
    const j = new THREE.Mesh(R, g);
    let k;
    (j.position.y = 5.7), (G = 0.35), j.scale.set(G, G, G), f.add(j);
    let V = [],
      D = [];
    (P = 2e3),
      (R = new THREE.CylinderGeometry(0.1, 4.5, 10, 8, 1, !0)),
      (H = new THREE.Mesh(R, new THREE.MeshBasicMaterial())),
      (k = new o(H).build()),
      (S = 0.1),
      (G = 3),
      (THREE.BufferGeometry.prototype.tripleFace = h);
    let W = new THREE.IcosahedronGeometry(S, 0).tripleFace(G);
    U = [];
    for (let e = 0; e < P; e++)
      k.sample(J),
        (R = W.clone()).rotateX(Math.random() * Math.PI),
        R.rotateY(Math.random() * Math.PI),
        R.rotateZ(Math.random() * Math.PI),
        R.translate(J.x, J.y, J.z),
        U.push(R);
    (R = BufferGeometryUtils.mergeGeometries(U)).computeVertexNormals(),
      (g = y.clone()).color.set("#5f8f00"),
      (g.reflectivity = 0.8),
      (H = new THREE.Mesh(R, g)),
      f.add(H),
      (R = new THREE.CylinderGeometry(0.6, 5, 10, 8, 1, !0)),
      (V = []),
      (D = []),
      (P = 282),
      (H = new THREE.Mesh(R, new THREE.MeshBasicMaterial())),
      (k = new o(H).build());
    for (let e = 0; e < P; e++) k.sample(J), V.push([J.x, J.y, J.z]);
    let X = [];
    for (let e = 0; e < 70; e++) {
      let e = Math.floor(Math.random() * V.length);
      X.push(V.splice(e, 1)[0]);
    }
    let Y = [];
    for (let e = 0; e < 70; e++) {
      let e = Math.floor(Math.random() * V.length);
      Y.push(V.splice(e, 1)[0]);
    }
    let O = [];
    for (let e = 0; e < 22; e++) {
      let e = Math.floor(Math.random() * V.length);
      O.push(V.splice(e, 1)[0]);
    }
    let oe = [];
    for (let e = 0; e < 120; e++) {
      let e = Math.floor(Math.random() * V.length);
      oe.push(V.splice(e, 1)[0]);
    }
    (S = 0.24),
      (G = 1),
      (R = new THREE.SphereGeometry(S, 20, 20)),
      (g = y.clone()),
      (x = new THREE.Mesh(R, g)),
      (H = d(G, oe, "sphere")),
      f.add(H),
      (G = 1),
      (R = (function (e) {
        let t = 1.5 * e,
          o = new THREE.SphereGeometry(e, 10, 10);
        const n = o.attributes.position;
        for (let r = 0; r < n.count; r++)
          n.getY(r) > e / 3 &&
            (o.attributes.position.setX(r, 0),
            o.attributes.position.setY(r, t),
            o.attributes.position.setZ(r, 0));
        (U = []), o.translate(0, -t, 0);
        let r = o.clone();
        return (
          r.rotateZ(Math.PI / 2),
          U.push(r),
          (r = o.clone()).rotateZ(-Math.PI / 2),
          U.push(r),
          (r = o.clone()).scale(0.7, 1.5, 0.7),
          r.rotateZ(Math.PI / 8),
          U.push(r),
          (r = o.clone()).scale(0.7, 1.5, 0.7),
          r.rotateZ(-Math.PI / 8),
          U.push(r),
          (r = new THREE.SphereGeometry(t / 2.3, 5, 5)),
          U.push(r),
          (o = BufferGeometryUtils.mergeGeometries(U)),
          (o = BufferGeometryUtils.mergeVertices(o, e / 10)).scale(1, 1, 0.7),
          o.rotateX(-Math.PI / 7),
          (o.attributes.position.needsUpdate = !0),
          o.computeBoundingBox(),
          o.computeVertexNormals(),
          o
        );
      })((S = 0.15))),
      ((g = y.clone()).reflectivity = 0.4),
      (x = new THREE.Mesh(R, g)),
      (H = d(G, O, "ribbon")),
      f.add(H),
      (S = 0.11),
      (G = 1),
      (R = new THREE.SphereGeometry(S, 10, 10)),
      (x = new THREE.Mesh(R, new THREE.MeshBasicMaterial())),
      (v = d(G, X, "light")),
      f.add(v),
      (B = d(G, Y, "light2")).layers.toggle(L),
      f.add(B),
      ((T = new e(M, w.domElement)).autoRotate = !0),
      (T.autoRotateSpeed = 1),
      (T.enableDamping = !0),
      (T.enablePan = !1),
      (T.minDistance = 8),
      (T.maxDistance = 30),
      (T.minPolarAngle = 0),
      (T.maxPolarAngle = Math.PI / 2),
      T.target.set(0, 0, 0),
      T.update(),
      p(),
      window.addEventListener("resize", c);
  })();
})();
