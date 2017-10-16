import CutsiteFilter from "../CutsiteFilter";
import React from "react";
import show_cut_sites_img from "./veToolbarIcons/show_cut_sites.png";

export default function CutsiteTool({ annotationVisibility = {}, isOpen }) {
  return {
    Icon: CutsiteToolIcon,
    toggled: annotationVisibility.cutsites,
    tooltip: "Show cut sites",
    tooltipToggled: "Hide cut sites",
    Dropdown: CutsiteToolDropDown,
    dropdowntooltip: (!isOpen ? "Show" : "Hide") + " Cut Site Options",
    id: "cutsites"
  };
}

function CutsiteToolIcon({ annotationVisibilityToggle }) {
  return (
    <div
      onClick={function() {
        annotationVisibilityToggle("cutsites");
      }}
    >
      <img src={show_cut_sites_img} alt="Show cut sites" />
    </div>
  );
}

function CutsiteToolDropDown({ editorName, annotationVisibilityShow }) {
  return (
    <div className={"veToolbarCutsiteFilterHolder"}>
      <h6>Filter Cut sites:</h6>
      <CutsiteFilter
        editorName={editorName}
        onChangeHook={function() {
          annotationVisibilityShow("cutsites");
        }}
      />
      {/* {showDigestTool && <DigestTool></DigestTool>} */}
    </div>
  );
}