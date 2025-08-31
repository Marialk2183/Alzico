# Test Images for Cognitive Tests

This directory contains images used in the cognitive tests. Each image should be:
- PNG or JPG format
- Optimized for web/mobile (under 500KB)
- Clear and high contrast
- Appropriate for cognitive assessment

## Required Images:

### MMSE Test:
- `pencil.png` - Simple pencil drawing (black on white)
- `intersecting_pentagons.png` - Two overlapping pentagons for copying task

### Boston Naming Test:
- `bed.png` - Simple bed illustration
- `tree.png` - Basic tree drawing
- `house.png` - Simple house outline
- `car.png` - Basic car drawing
- `phone.png` - Mobile phone illustration
- `book.png` - Book with visible cover
- `clock.png` - Analog clock face
- `flower.png` - Simple flower drawing
- `ball.png` - Basic ball/sphere
- `hat.png` - Simple hat illustration
- `boat.png` - Basic boat drawing
- `bird.png` - Simple bird silhouette
- `fish.png` - Basic fish drawing
- `apple.png` - Red apple illustration
- `cup.png` - Simple cup/mug drawing

### ADAS-Cog Test:
- `adas_finger.png` - Hand with pointing finger
- `adas_circle_drawing.png` - Simple geometric pattern to copy
- `adas_scene.png` - Simple scene (e.g., kitchen, park) for description

## Image Specifications:
- **Size**: 300x300 pixels minimum
- **Format**: PNG with transparency or JPG with white background
- **Style**: Simple, clear line drawings
- **Color**: Black lines on white background (high contrast)
- **Complexity**: Appropriate for cognitive assessment (not too detailed)

## Audio Files:
Audio files should be placed in `../audio/tests/` directory:
- `ravlt_word_list.mp3` - 15 words for RAVLT test
- `ravlt_interference_list.mp3` - Interference word list
- `adas_word_list.mp3` - 10 words for ADAS-Cog test

## Implementation Notes:
- Images are loaded dynamically in the test interface
- Fallback to placeholder if image fails to load
- Audio files use Expo Audio API for playback
- All assets should be optimized for mobile performance 