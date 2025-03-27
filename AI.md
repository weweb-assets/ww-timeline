---
name: ww-timeline
description: Timeline component for visualizing chronological events with customizable markers and layouts.
keywords:
  - timeline 
  - events
  - chronology
  - vertical
  - horizontal
  - markers
  - history
---

#### ww-timeline

***Description***: A flexible timeline component that supports both vertical and horizontal layouts, with customizable markers and event content. Perfect for displaying chronological events, project milestones, or history visualization.

***Specifications***:
- Multiple layout options (vertical/horizontal)
- Customizable marker shapes (circle/square)
- Optional icons in markers
- Flexible event alignment options
- Connector line styling options
- Responsive design
- Click events for both markers and content
- Support for dynamic data binding

***Properties***:
- `data`: Array of event objects to display in the timeline (bindable)
- `markerShape`: Shape of timeline markers - "circle" or "square" (default: "circle")
- `markerIconOnOff`: Toggle marker icon visibility (default: false)
- `markerIcon`: Icon to display in markers (requires markerIconOnOff: true)
- `markerIconColor`: Color of the marker icon (default: "#FFFFFF")
- `markerBackgroundColor`: Background color of markers (default: "#4B5563")
- `connectorColor`: Color of the timeline connector line (default: "#E5E7EB")
- `connectorWidth`: Width of the timeline connector line (default: "2px")
- `timelineLayout`: Timeline orientation - "vertical" or "horizontal" (default: "vertical")
- `eventsAlignmentVertical`: Vertical layout alignment - "left", "right", or "alternate" (default: "left")
- `eventsAlignmentHorizontal`: Horizontal layout alignment - "top" or "bottom" (default: "top")

***Children***:
- `timelineElement`: Container element for event content (ww-flexbox)
- `markerIconElement`: Icon element inside markers (ww-icon)

***Events***:
- `click`: Triggered when clicking an event's content
  - Event data: event object from timeline data
- `markerClick`: Triggered when clicking an event's marker
  - Event data: event object from timeline data

***Context***:
- `context.item.data`: Event object from timeline data
- `context.item.index`: Index of the event in the timeline data

Example:
<elements>
{"uid":0,"tag":"ww-timeline","settings":{"dynamicConfiguration":{"content":{"data":[{"key":"title","type":"Text"},{"key":"date","type":"Text"},{"key":"description","type":"Text"}]}}},"props":{"default":{"data":[{"date":"January 18, 2024","title":"Project Kickoff","description":"Initial team meeting to define project scope, objectives, and key milestones. Established core team members and communication channels."},{"date":"February 25, 2024","title":"Design Phase Complete","description":"Finalized all design assets, including user interface mockups, design system, and interactive prototypes. Received stakeholder approval."},{"date":"March 13, 2024","title":"Beta Launch","description":"Successfully launched beta version to selected test users. Gathering feedback and monitoring performance metrics for final adjustments."}],"markerIcon":"lucide/aperture","markerShape":"circle","connectorColor":"#e2e8f0","connectorWidth":"2px","timelineLayout":"vertical","markerIconColor":"#FFFFFF","markerIconOnOff":true,"markerBackgroundColor":"#3b82f6","eventsAlignmentVertical":"alternate","eventsAlignmentHorizontal":"bottom"}},"children":{"timelineElement":{"uid":1},"markerIconElement":{"uid":9}}}
{"uid":1,"tag":"ww-flexbox","name":"Timeline Event Card","states":[{"id":"_wwHover","label":"hover"}],"styles":{"default":{"width":"320px","border":"1px solid #e5e7eb","cursor":"pointer","display":"flex","padding":"24px","boxShadow":"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)","transition":"all 0.3s ease","borderRadius":"12px","backgroundColor":"#ffffff","rowGap":"16px","columnGap":"16px","flexDirection":"column"},"_wwHover_default":{"display":"flex","boxShadow":"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)","transform":"translateY(-2px)"}},"children":{"children":[{"uid":2},{"uid":5},{"uid":7}]}}
{"uid":2,"tag":"ww-flexbox","name":"Date Container","states":[{"id":"_wwHover","label":"hover"}],"styles":{"default":{"display":"flex","rowGap":"8px","columnGap":"8px","alignItems":"center"},"_wwHover_default":{"display":"flex"}},"children":{"children":[{"uid":3},{"uid":4}]}}
{"uid":3,"tag":"ww-icon","name":"Date Icon","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"icon":"lucide/calendar","color":"#3b82f6"}},"styles":{"default":{"width":"16px","height":"16px"}}}
{"uid":4,"tag":"ww-text","name":"Date Text","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"tag":"p","text":{"en":{"wwFormula":"context.item.data?.['date']"}}}},"styles":{"default":{"margin":"0","color":"#6b7280","fontSize":"14px","fontWeight":"500"}}}
{"uid":5,"tag":"ww-flexbox","name":"Title Container","states":[{"id":"_wwHover","label":"hover"}],"styles":{"default":{"display":"flex","rowGap":"12px","columnGap":"12px","alignItems":"center"},"_wwHover_default":{"display":"flex"}},"children":{"children":[{"uid":6}]}}
{"uid":6,"tag":"ww-text","name":"Title Text","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"tag":"h3","text":{"en":{"wwFormula":"context.item.data?.['title']"}}}},"styles":{"default":{"margin":"0","color":"#111827","fontSize":"18px","fontWeight":"600","lineHeight":"1.4"}}}
{"uid":7,"tag":"ww-flexbox","name":"Description Container","states":[{"id":"_wwHover","label":"hover"}],"styles":{"default":{"display":"flex","rowGap":"8px","columnGap":"8px","flexDirection":"column"},"_wwHover_default":{"display":"flex"}},"children":{"children":[{"uid":8}]}}
{"uid":8,"tag":"ww-text","name":"Description Text","states":[{"id":"_wwHover","label":"hover"}],"props":{"default":{"tag":"p","text":{"en":{"wwFormula":"context.item.data?.['description']"}}}},"styles":{"default":{"margin":"0","color":"#4b5563","fontSize":"14px","lineHeight":"1.6"}}}
{"uid":9,"tag":"ww-icon","props":{"default":{"icon":"lucide/check"}},"styles":{"default":{"width":"16px","height":"16px","margin":"2px"}}}
</elements>
