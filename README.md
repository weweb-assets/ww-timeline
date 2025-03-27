# WeWeb Timeline Component

A highly customizable timeline component for WeWeb that supports both vertical and horizontal layouts.

## Properties

### Marker Style
- **Shape**: Circle or Square
- **Icon**: Any system icon
- **Icon Color**: Color of the marker icon
- **Background Color**: Background color of the marker

### Timeline Style
- **Connector Color**: Color of the timeline line
- **Connector Width**: Width of the timeline line
- **Layout**: Vertical or Horizontal
- **Events Alignment**: 
  - For vertical layout: Left, Right, or Alternate
  - For horizontal layout: Top or Bottom

### Data
The component accepts an array of timeline events. Each event can have the following properties:
```javascript
{
    date: "2025-03-10",
    title: "Project Kickoff",
    description: "Initial project meeting to align goals and expectations."
}
```

## Events

The component emits the following events:
- **click**: When clicking on an event's content
