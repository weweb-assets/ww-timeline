export default {
  inherit: {
    type: "ww-layout",
  },
  editor: {
    label: {
      en: "Timeline",
    },
    icon: "history",
    customStylePropertiesOrder: [
      [
        "markerStyle",
        "markerShape",
        "markerSize",
        "markerIconOnOff",
        "markerIcon",
        "markerIconColor",
        "markerBackgroundColor",
      ],
      [
        "timelineStyle",
        "connectorColor",
        "connectorWidth",
        "timelineLayout",
        "eventsAlignment",
      ],
    ],
    customSettingsPropertiesOrder: [["data"]],
  },
  properties: {
    // Marker styling
    markerStyle: {
      type: "Title",
      label: { en: "Marker Style" },
      section: "style",
      editorOnly: true,
    },
    markerShape: {
      label: { en: "Marker Shape" },
      type: "TextRadioGroup",
      section: "style",
      bindable: true,
      defaultValue: "circle",
      options: {
        choices: [
          { value: "circle", title: "Circle", icon: "16/circle-info" },
          { value: "square", title: "Square", icon: "16/minus" },
        ],
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip:
          'The shape of the timeline markers: circle or square\n\nEither "circle" or "square"',
      },
      /* wwEditor:end */
    },
    markerIconOnOff: {
      label: { en: "Show Icon" },
      type: "OnOff",
      section: "style",
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip:
          "Toggle marker icon visibility\n\nBoolean (either true or false)",
      },
      /* wwEditor:end */
    },
    markerIcon: {
      label: { en: "Marker Icon" },
      type: "SystemIcon",
      section: "style",
      bindable: true,
      defaultValue: null,
      hidden: (content) => !content.markerIconOnOff,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip:
          'The icon to display in timeline markers\n\nString (icon name like "home", "calendar")',
      },
      /* wwEditor:end */
    },
    markerIconColor: {
      label: { en: "Marker Icon Color" },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "#FFFFFF",
      hidden: (content) => !content.markerIconOnOff,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip:
          'The color of the icon in timeline markers\n\nColor string (e.g., "#FFFFFF", "rgba(255,255,255,0.5)")',
      },
      /* wwEditor:end */
    },
    markerSize: {
      label: { en: "Marker Size" },
      type: "Length",
      section: "style",
      bindable: true,
      defaultValue: "16px",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip:
          'The size (width and height) of timeline markers\n\nLength in pixels (e.g., "16px")',
      },
      /* wwEditor:end */
    },
    markerBackgroundColor: {
      label: { en: "Marker Background" },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "#4B5563",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip:
          'The background color of timeline markers\n\nColor string (e.g., "#4B5563", "rgba(75,85,99,0.8)")',
      },
      /* wwEditor:end */
    },

    // Timeline styling
    timelineStyle: {
      type: "Title",
      label: { en: "Timeline Style" },
      section: "style",
      editorOnly: true,
    },
    connectorColor: {
      label: { en: "Connector Color" },
      type: "Color",
      section: "style",
      bindable: true,
      defaultValue: "#E5E7EB",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip:
          'The color of the timeline connector line\n\nColor string (e.g., "#E5E7EB", "rgba(229,231,235,0.5)")',
      },
      /* wwEditor:end */
    },
    connectorWidth: {
      label: { en: "Connector Width" },
      type: "Length",
      section: "style",
      bindable: true,
      defaultValue: "2px",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip:
          'The width of the timeline connector line\n\nLength in pixels (e.g., "2px")',
      },
      /* wwEditor:end */
    },
    timelineLayout: {
      label: { en: "Layout" },
      type: "TextRadioGroup",
      section: "style",
      bindable: true,
      defaultValue: "vertical",
      options: {
        choices: [
          { value: "vertical", title: "Vertical", icon: "type-rows" },
          { value: "horizontal", title: "Horizontal", icon: "type-columns" },
        ],
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip:
          'The layout orientation of the timeline\n\nEither "vertical" or "horizontal"',
      },
      /* wwEditor:end */
    },
    eventsAlignmentVertical: {
      label: { en: "Events Alignment" },
      type: "TextRadioGroup",
      section: "style",
      bindable: true,
      defaultValue: "left",
      hidden: (content) => content.timelineLayout !== "vertical",
      options: {
        choices: [
          { value: "left", title: "Left", icon: "16/alignment-left" },
          { value: "right", title: "Right", icon: "16/alignment-right" },
          {
            value: "alternate",
            title: "Alternate",
            icon: "16/alignment-justify",
          },
        ],
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip:
          "The alignment of timeline events: left/right/alternate for vertical, top/bottom for horizontal",
      },
      /* wwEditor:end */
    },
    eventsAlignmentHorizontal: {
      label: { en: "Events Alignment" },
      type: "TextRadioGroup",
      section: "style",
      bindable: true,
      defaultValue: "top",
      hidden: (content) => content.timelineLayout !== "horizontal",
      options: {
        choices: [
          { value: "top", title: "Top", icon: "16/arrow-top" },
          { value: "bottom", title: "Bottom", icon: "16/arrow-bottom" },
        ],
      },
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip:
          "The alignment of timeline events: left/right/alternate for vertical, top/bottom for horizontal",
      },
      /* wwEditor:end */
    },

    data: {
      label: { en: "Timeline Data" },
      type: "ObjectList",
      options: {
        useSchema: true,
      },
      section: "settings",
      bindable: true,
      defaultValue: [],
      /* wwEditor:start */
      bindingValidation: {
        validations: [
          {
            type: "array",
          },
          {
            type: "object",
          },
        ],
        tooltip:
          "A collection or an array of data: \n\n`myCollection` or `[{}, {}, ...]`",
      },
      /* wwEditor:end */
    },

    // Hidden elements for child components
    timelineElement: {
      hidden: true,
      defaultValue: { isWwObject: true, type: "ww-flexbox" },
    },
    markerIconElement: {
      hidden: true,
      defaultValue: { isWwObject: true, type: "ww-icon" },
    },
  },
  triggerEvents: [
    {
      name: "click",
      label: { en: "On event click" },
      event: { value: null },
    },
    {
      name: "markerClick",
      label: { en: "On marker click" },
      event: { value: null },
    },
  ],
};
