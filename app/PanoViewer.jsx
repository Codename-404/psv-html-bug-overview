"use client";
import React, { useEffect, useRef, useState } from "react";
import * as PhotoSphereViewer from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";
import {
  MarkersPlugin,
  MarkersPluginConfig,
} from "@photo-sphere-viewer/markers-plugin";

export default function PanoViewer() {
  const viewerContainerRef = useRef(null);
  const viewerRef = useRef(null);
  const markersPlugs = useRef(null);

  const plugins = [[MarkersPlugin]];

  useEffect(() => {
    if (viewerContainerRef.current && !viewerRef.current) {
      viewerRef.current = new PhotoSphereViewer.Viewer({
        plugins: plugins,
        container: viewerContainerRef.current,
        panorama: "/Test_Pano.jpg",
      });

      viewerRef.current.addEventListener("ready", () => {
        /*** Initialization ***/
        viewerRef.current.addEventListener("click", onClickPano);
        markersPlugs.current = viewerRef.current.getPlugin(MarkersPlugin);
      });
    }
  }, []);

  const onClickPano = (e) => {
    const position = PhotoSphereViewer.utils.getPosition(
      viewerContainerRef.current
    );

    const coords = viewerRef.current.dataHelper.viewerCoordsToSphericalCoords({
      x: e.data.clientX - position.x,
      y: e.data.clientY - position.y,
    });
    console.log("clicked position", coords);

    const id = Date.now();

    markersPlugs.current.addMarker({
      id: id,
      position: { yaw: coords.yaw, pitch: coords.pitch },
      html: "HTML <b>marker</b> &hearts;",
      anchor: "bottom right",
      scale: [0.5, 1.5],
      style: {
        maxWidth: "100px",
        color: "white",
        fontSize: "20px",
        fontFamily: "Helvetica, sans-serif",
        textAlign: "center",
      },
      tooltip: {
        content: "An HTML marker",
        position: "right",
      },
    });
  };
  return <div ref={viewerContainerRef} className="w-screen h-screen" />;
}
