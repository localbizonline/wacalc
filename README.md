# WhatsApp Service Pricing Calculator

An interactive, real-time pricing calculator for WhatsApp messaging services with a clean and modern design.

## Features

- **Message Type Selection**: Toggle between Marketing ($0.04/message) and Utility ($0.008/message) options
- **Dynamic Quantity Slider**: Select from 0 to 100,000 messages with smooth visual feedback
- **Real-time Calculation**: Total price updates instantly as you adjust parameters
- **Pricing Breakdown**: Clear display of selected options and calculation formula
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Professional animations enhance user experience
- **Reset Functionality**: Quickly reset to default values

## How to Use

1. Open `index.html` in any modern web browser
2. Select your message type (Marketing or Utility)
3. Adjust the slider to set the number of messages
4. View the real-time total cost and pricing breakdown
5. Click "Reset Calculator" to start over

## Pricing Structure

- **Marketing Messages**: $0.04 per message
- **Utility Messages**: $0.008 per message

**Formula**: Total Cost = Message Type Rate × Number of Messages

## File Structure

```
Reachmax Calc/
├── index.html    # Main HTML structure
├── styles.css    # Styling and animations
├── script.js     # JavaScript logic and calculations
└── README.md     # This file
```

## Browser Compatibility

Works on all modern browsers:
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Animations)
- Vanilla JavaScript (no dependencies required)

## Customization

You can easily customize the calculator by modifying:
- Message rates in `script.js` (state object)
- Color scheme in `styles.css` (CSS variables in :root)
- Maximum message quantity in `index.html` (slider max attribute)

