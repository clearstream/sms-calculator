class Encoding {
  /**
   * @return {Number}
   */
  getMaxSmsSegmentLength() {
    throw 'You must override this method.';
  }

  /**
   * @return {Number}
   */
  getMaxConcatenatedSmsSegmentLength() {
    throw 'You must override this method.';
  }

  /**
   * @param {String} text
   * @return {Number}
   */
  getTextLength(text) {
    throw 'You must override this method.';
  }

  /**
   * @param {String} text
   * @return {Number}
   */
  getSegmentsCount(text) {
    const length = this.getTextLength(text);

    if (length <= this.getMaxSmsSegmentLength()) {
      return 1;
    }

    return Math.ceil(length / this.getMaxConcatenatedSmsSegmentLength());
  }

  /**
   * @param {Number} segmentsCount
   * @return {Number}
   */
  getMaxTextLength(segmentsCount) {
    if (segmentsCount <= 0) {
      throw 'Segments count should be a positive number.';
    }

    return segmentsCount === 1
      ? this.getMaxSmsSegmentLength()
      : this.getMaxConcatenatedSmsSegmentLength() * segmentsCount;
  }
}

export default Encoding;
