<template>
  <div class="p-3 sm:p-10">
    <div class="w-full bg-white rounded shadow-md flex flex-col items-center justify-center p-6">
      <h1 class="mb-2 flex flex-col justify-center items-center">
        <svg width="81" height="90" viewBox="0 0 81 90" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 mb-2">
          <path d="M35.4558 67.3231L39.1988 58.604C29.2953 58.2769 21.1658 50.2473 21.1658 39.8707C21.1658 29.494 29.7222 21.1751 39.8891 21.1751C52.4391 21.1751 59.8115 31.0051 59.8115 41.0982C59.8115 55.7742 46.1326 66.2207 35.4558 67.3231L25.7783 89.836C54.8686 92.1322 81 70.0415 81 41.0982C81 18.2017 64.8503 0.00303606 39.8891 0.00303606C17.8529 -0.267788 -0.222433 17.6143 0.00206897 39.8707C0.190387 58.5397 12.4778 74.1888 30.5664 78.7123L35.4558 67.3231Z" fill="#7857FF"/>
        </svg>
        <span class="font-semibold text-xl text-gray-800">SMS Calculator</span>
      </h1>
      <p class="mb-6 text-sm text-center text-gray-800">
        Use the form below to calculate the number of credits a text message will use.
      </p>
      <textarea v-model="text" class="bg-gray-100 text-gray-700 w-full rounded px-6 py-4 focus:outline-none" rows="7" placeholder="Type your text..."></textarea>
      <div class="flex flex-col sm:flex-row justify-around flex-wrap mt-6">
        <div class="w-28 h-14 flex flex-col items-center justify-center">
          <p class="text-gray-800">Characters</p>
          <p :class="[isWithinLengthLimit ? 'text-gray-400' : 'text-red-500']">{{ charactersLabel }}</p>
        </div>
        <div class="w-28 h-14 flex flex-col items-center justify-center">
          <p class="text-gray-800">Encoding</p>
          <p class="text-gray-400">{{ encodingLabel }}</p>
        </div>
        <div class="w-28 h-14 flex flex-col items-center justify-center">
          <p class="text-gray-800">Credits</p>
          <p class="text-gray-400">{{ creditsLabel }}</p>
        </div>
      </div>
    </div>
    <p class="text-xs text-center mt-6 text-gray-400">
      Created by <a class="font-semibold" href="https://clearstream.io" target="_blank">Clearstream</a>, <a href="https://clearstream.io" target="_blank" class="italic">a texting software for churches.</a>
    </p>
  </div>
</template>

<script>
import EncodedText from "./utils/encodedText/EncodedText";
import GSM7 from "./utils/encodedText/GSM7";
import UCS2 from "./utils/encodedText/UCS2";

export default {
  data() {
    return {
      text: new URL(location.href).searchParams.get('text') ?? '',
      maxNumberOfSegments: 5,
    };
  },
  watch: {
    header() {
      this.replaceLocation();
    },
    text() {
      this.replaceLocation();
    },
  },
  computed: {
    fullText() {
      return this.text;
    },
    encodedFullText() {
      return new EncodedText(this.fullText);
    },
    charactersLabel() {
      return [
        this.encodedFullText.getLength(),
        this.encodedFullText.getEncoding().getMaxTextLength(
            Math.min(this.maxNumberOfSegments, this.encodedFullText.getNumberOfSegments())
        ),
      ].join('/');
    },
    encodingLabel() {
      if (this.encodedFullText.encoding instanceof GSM7) {
        return 'GSM-7';
      }

      if (this.encodedFullText.encoding instanceof UCS2) {
        return 'UCS-2';
      }

      return null;
    },
    creditsLabel() {
      return Math.min(this.maxNumberOfSegments, this.encodedFullText.getNumberOfSegments());
    },
    maxTextLength() {
      return this.encodedFullText.getEncoding().getMaxTextLength(
          Math.min(this.maxNumberOfSegments, this.encodedFullText.getNumberOfSegments())
      );
    },
    isWithinLengthLimit() {
      return this.encodedFullText.getLength() <= this.maxTextLength;
    },
  },
  methods: {
    replaceLocation() {
      const url = new URL(location.href);

      url.searchParams.delete('text');

      if (this.text.length > 0) {
        url.searchParams.set('text', this.text);
      }

      window.history.pushState({}, document.title, url.toString());
    },
  },
};
</script>
