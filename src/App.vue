<template>
  <div class="p-3 sm:p-10">
    <div class="w-full bg-white rounded shadow-md flex flex-col items-center p-6">
      <h1 class="mb-6 flex flex-col justify-center items-center">
        <svg viewBox="0 0 24 22" width="24" xmlns="http://www.w3.org/2000/svg" class="text-pink-500 w-8 mb-2">
          <path d="m2.2614 12.4299c-.48034 0-.86988-.3879-.86988-.8662 0-.4785.38954-.8663.86988-.8663.48033 0 .86988.3878.86988.8663 0 .4783-.38955.8662-.86988.8662zm19.2685-8.12665c.4803 0 .8699.38787.8699.86613 0 .4785-.3896.86613-.8699.86613-.4806 0-.8701-.38763-.8701-.86613 0-.47826.3895-.86613.8701-.86613zm-6.9302 7.94705c.1313.1394.3151.2188.5072.2188.1926 0 .3761-.0794.5075-.2188l4.8172-5.11408c.3254.18103.6996.28505 1.0983.28505 1.2469 0 2.2614-1.01009 2.2614-2.25189 0-.99981-.6583-1.84848-1.5657-2.14142v-2.335105c0-.382609-.3115-.69299996-.6957-.69299996h-19.2685c-.38427 0-.69576.31039096-.69576.69299996v6.820475h1.39152v-6.12771h17.87694v1.64234c-.9076.29294-1.5659 1.14161-1.5659 2.14142 0 .33956.0781.66048.214.94958l-4.3753 4.64444-5.91528-6.27961c-.26299-.27883-.75172-.27883-1.01495 0l-4.81652 5.11333c-.32566-.18103-.70008-.28529-1.09875-.28529-1.24694 0-2.26164414 1.01037-2.26164414 2.25187 0 .9998.65853414 1.8485 1.56588414 2.1414v2.4248c0 .1844.07349.3609.20462.4907.13065.1294.30693.2023.49114.2023h.0024l6.52746-.0225v4.4424c0 .2843.17436.5397.43998.6444.08286.0328.1698.0486.25554.0486.18877 0 .3737-.0763.50771-.2188l4.61021-4.8941h6.9252c.3842 0 .6957-.3104.6957-.693v-7.03448h-1.3915v6.34178h-6.5308c-.1924 0-.3759.0794-.5075.2188l-3.613 3.8356v-3.3861c0-.1843-.0735-.3608-.20464-.4909-.13041-.1294-.30693-.2021-.49114-.2021h-.00216l-6.5277.0223v-1.7297c.90734-.2929 1.56588-1.1416 1.56588-2.1414 0-.3393-.07806-.6602-.21375-.9491l4.37485-4.6439z" fill="currentColor"></path>
        </svg>
        <span class="font-semibold text-xl">SMS Calculator</span>
      </h1>
      <input v-model="header" type="text" class="bg-gray-100 text-gray-700 w-full rounded px-6 py-4 focus:outline-none mb-4 font-semibold" placeholder="Header">
      <textarea v-model="text" class="bg-gray-100 text-gray-700 w-full rounded px-6 py-4 focus:outline-none" rows="7" placeholder="Type your message..."></textarea>
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
  </div>
</template>

<script>
import EncodedText from "./utils/encodedText/EncodedText";
import GSM7 from "./utils/encodedText/GSM7";
import UCS2 from "./utils/encodedText/UCS2";

export default {
  data() {
    return {
      header: new URL(location.href).searchParams.get('header') ?? '',
      text: new URL(location.href).searchParams.get('text') ?? '',
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
      return `${this.header}: ${this.text}`;
    },
    encodedFullText() {
      return new EncodedText(this.fullText);
    },
    charactersLabel() {
      return [
        this.encodedFullText.getLength(),
        this.encodedFullText.getEncoding().getMaxTextLength(
            Math.min(3, this.encodedFullText.getNumberOfSegments())
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
      return Math.min(3, this.encodedFullText.getNumberOfSegments());
    },
    maxTextLength() {
      return this.encodedFullText.getEncoding().getMaxTextLength(
          Math.min(3, this.encodedFullText.getNumberOfSegments())
      );
    },
    isWithinLengthLimit() {
      return this.encodedFullText.getLength() <= this.maxTextLength;
    },
  },
  methods: {
    replaceLocation() {
      const url = new URL(location.href);

      url.searchParams.delete('header');

      if (this.header.length > 0) {
        url.searchParams.set('header', this.header);
      }

      url.searchParams.delete('text');

      if (this.text.length > 0) {
        url.searchParams.set('text', this.text);
      }

      window.history.pushState({}, document.title, url.toString());
    },
  },
};
</script>
