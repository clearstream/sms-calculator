import UCS2 from './UCS2';
import Encoding from './Encoding';
import GSM7 from './GSM7';

class EncodedText {
  /**
   * @param {?String} text
   * @param {?Encoding} forceEncoding
   */
  constructor(text, forceEncoding = null) {
    this.text = text ?? '';
    this.encoding = this.detectEncoding(this.text, forceEncoding);
  }

  /**
   * @private
   * @param {String} text
   * @param {?Encoding} forceEncoding
   * @return {Encoding}
   */
  detectEncoding(text, forceEncoding = null) {
    if (forceEncoding instanceof UCS2) {
      return forceEncoding;
    }

    const containsAtLeastOneNonGsmCharacter = text
      .split('')
      .some(char => !GSM7.getCodePoints().hasOwnProperty(char.charCodeAt(0)));

    if (containsAtLeastOneNonGsmCharacter && forceEncoding instanceof GSM7) {
      throw 'Non-GSM character encountered.';
    }

    if (forceEncoding instanceof GSM7) {
      return forceEncoding;
    }

    return containsAtLeastOneNonGsmCharacter ? new UCS2() : new GSM7();
  }

  /**
   * @return {String}
   */
  getValue() {
    return this.text;
  }

  /**
   * @return {Encoding}
   */
  getEncoding() {
    return this.encoding;
  }

  /**
   * @return {Number}
   */
  getLength() {
    return this.getEncoding().getTextLength(this.getValue());
  }

  /**
   * @return {Number}
   */
  getNumberOfSegments() {
    return this.getEncoding().getSegmentsCount(this.getValue());
  }

  /**
   * @param {Number} length
   * @return EncodedText
   */
  limit(length) {
    let value = this.getValue();

    while (this.getEncoding().getTextLength(value) > length) {
      // TODO: consider graphemes
      value = value.slice(0, -1);
    }

    return new EncodedText(value, this.getEncoding());
  }

  /**
   * @return {Boolean}
   */
  isGsm7() {
    return this.getEncoding() instanceof GSM7;
  }

  /**
   * @return {Boolean}
   */
  isUcs2() {
    return this.getEncoding() instanceof UCS2;
  }
}

export default EncodedText;
