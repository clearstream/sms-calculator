import Encoding from './Encoding';

class UCS2 extends Encoding {
  getMaxSmsSegmentLength() {
    return 70;
  }

  getMaxConcatenatedSmsSegmentLength() {
    return 67;
  }

  getTextLength(text) {
    return (text ?? '').length;
  }
}

export default UCS2;
