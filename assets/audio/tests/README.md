# Test Audio Files for Cognitive Tests

This directory contains audio files used in the cognitive tests. Each audio file should be:
- MP3 format for compatibility
- Clear, high-quality audio
- Appropriate volume and pacing
- Professional voice recording

## Required Audio Files:

### RAVLT (Rey Auditory Verbal Learning Test):
- `ravlt_word_list.mp3` - 15 words spoken clearly with 1-second intervals
  - Words: "Apple, Penny, Table, House, Car, Tree, Book, Phone, Clock, Flower, Ball, Hat, Boat, Bird, Fish"
  - Duration: ~20 seconds
  - Format: Clear female/male voice, neutral tone

- `ravlt_interference_list.mp3` - 15 different words for interference
  - Words: "Chair, Desk, Lamp, Door, Window, Plant, Cup, Plate, Knife, Fork, Spoon, Bowl, Glass, Mug, Saucer"
  - Duration: ~20 seconds
  - Format: Same voice and pacing as main list

### ADAS-Cog (Alzheimer's Disease Assessment Scale):
- `adas_word_list.mp3` - 10 words for memory test
  - Words: "Face, Velvet, Church, Daisy, Red, House, Tree, Bird, Book, Chair"
  - Duration: ~15 seconds
  - Format: Clear pronunciation, 1.5-second intervals

## Audio Specifications:
- **Format**: MP3, 128kbps minimum
- **Sample Rate**: 44.1kHz
- **Channels**: Mono (for consistency)
- **Duration**: As specified above
- **Volume**: Normalized to -16dB LUFS
- **Voice**: Professional, clear, neutral accent
- **Pacing**: Consistent intervals between words

## Recording Guidelines:
- Use professional recording equipment
- Quiet, controlled environment
- Clear pronunciation of each word
- Consistent timing between words
- No background noise or music
- Appropriate for medical/cognitive assessment

## Implementation Notes:
- Audio files are loaded using Expo Audio API
- Playback controls include play, pause, and stop
- Progress bar shows audio playback position
- Audio can be replayed multiple times
- Files are cached for better performance
- Fallback handling for audio loading errors

## File Naming Convention:
- Use lowercase with underscores
- Include test abbreviation (ravlt_, adas_)
- Descriptive names (word_list, interference_list)
- Consistent format across all tests 