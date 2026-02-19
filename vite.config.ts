import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Faster compiler – kept from second config
import path from 'path';

export default defineConfig({
  // ---------------------------------------------------------------------
  // PLUGINS – React with SWC for speed
  // ---------------------------------------------------------------------
  plugins: [react()],

  // ---------------------------------------------------------------------
  // RESOLVE – extensions and aliases (merged from both configs)
  // ---------------------------------------------------------------------
  resolve: {
    // File extensions to try – kept from second config
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],

    alias: {
      // ---------- VERSION‑PINNED PACKAGE ALIASES (from second config) ----------
      // These ensure that shadcn/ui components import the correct versions
      'vaul@1.1.2': 'vaul',
      'sonner@2.0.3': 'sonner',
      'recharts@2.15.2': 'recharts',
      'react-resizable-panels@2.1.7': 'react-resizable-panels',
      'react-hook-form@7.55.0': 'react-hook-form',
      'react-day-picker@8.10.1': 'react-day-picker',
      'next-themes@0.4.6': 'next-themes',
      'lucide-react@0.487.0': 'lucide-react',
      'input-otp@1.4.2': 'input-otp',
      'embla-carousel-react@8.6.0': 'embla-carousel-react',
      'cmdk@1.1.1': 'cmdk',
      'class-variance-authority@0.7.1': 'class-variance-authority',
      '@supabase/supabase-js@2': '@supabase/supabase-js',
      '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
      '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
      '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
      '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
      '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
      '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
      '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
      '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
      '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
      '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
      '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
      '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
      '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
      '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
      '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
      '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
      '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
      '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
      '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
      '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
      '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
      '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
      '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
      '@jsr/supabase__supabase-js@2.49.8': '@jsr/supabase__supabase-js',

      // ---------- FIGMA ASSET ALIASES (from second config) ----------
      // Maps Figma's virtual module paths to actual image files in src/assets/
      'figma:asset/ffd345bec28c96127a802c1d7920b7d567dd27c8.png': path.resolve(__dirname, './src/assets/ffd345bec28c96127a802c1d7920b7d567dd27c8.png'),
      'figma:asset/fe0e85d237426482e6c2de130a4f58cc512cd41f.png': path.resolve(__dirname, './src/assets/fe0e85d237426482e6c2de130a4f58cc512cd41f.png'),
      'figma:asset/fc515718ef7b54c3c4c093fb1adfaf2e92c6bbb8.png': path.resolve(__dirname, './src/assets/fc515718ef7b54c3c4c093fb1adfaf2e92c6bbb8.png'),
      'figma:asset/fb8ab6f0644e62193e0195e4625e0b919fb94458.png': path.resolve(__dirname, './src/assets/fb8ab6f0644e62193e0195e4625e0b919fb94458.png'),
      'figma:asset/f8afa3dae94126a2a889d688db401acf6ff3cb08.png': path.resolve(__dirname, './src/assets/f8afa3dae94126a2a889d688db401acf6ff3cb08.png'),
      'figma:asset/f86d3322537052377703145a650e89a5afbc9cbf.png': path.resolve(__dirname, './src/assets/f86d3322537052377703145a650e89a5afbc9cbf.png'),
      'figma:asset/f483df4ad9e48816b4c3991f9fb3e29bdc141bd0.png': path.resolve(__dirname, './src/assets/f483df4ad9e48816b4c3991f9fb3e29bdc141bd0.png'),
      'figma:asset/f36cc7f352eab06026ea08f68ca0ad4dd0bd7e4f.png': path.resolve(__dirname, './src/assets/f36cc7f352eab06026ea08f68ca0ad4dd0bd7e4f.png'),
      'figma:asset/f21b6362bbbb728ab211984daecd1198c4891d15.png': path.resolve(__dirname, './src/assets/f21b6362bbbb728ab211984daecd1198c4891d15.png'),
      'figma:asset/f041a38911a46bb4aa48ca81de8fe5ffdc964240.png': path.resolve(__dirname, './src/assets/f041a38911a46bb4aa48ca81de8fe5ffdc964240.png'),
      'figma:asset/ed623911fad1e1cbcafeb4d00a8b9c9c49cfc4d9.png': path.resolve(__dirname, './src/assets/ed623911fad1e1cbcafeb4d00a8b9c9c49cfc4d9.png'),
      'figma:asset/ebb58a2ba4a0993173180ff612fa43fda252af78.png': path.resolve(__dirname, './src/assets/ebb58a2ba4a0993173180ff612fa43fda252af78.png'),
      'figma:asset/e8e075ba1660c3851a8eee030e2c11a9431041f1.png': path.resolve(__dirname, './src/assets/e8e075ba1660c3851a8eee030e2c11a9431041f1.png'),
      'figma:asset/e48de0b3ba7be208ecc3f59e4ee83a870b41e949.png': path.resolve(__dirname, './src/assets/e48de0b3ba7be208ecc3f59e4ee83a870b41e949.png'),
      'figma:asset/df7f69fe4bd2c1323ff6e402d01b6945ce6bdff5.png': path.resolve(__dirname, './src/assets/df7f69fe4bd2c1323ff6e402d01b6945ce6bdff5.png'),
      'figma:asset/def95e29c0eeae5105f409aeb9218afff0dec902.png': path.resolve(__dirname, './src/assets/def95e29c0eeae5105f409aeb9218afff0dec902.png'),
      'figma:asset/de4eff0107ece6776a39e487469a8b154a1d5edc.png': path.resolve(__dirname, './src/assets/de4eff0107ece6776a39e487469a8b154a1d5edc.png'),
      'figma:asset/ddf5c2fe9865e875c3350ea6442b474e1d1cd62e.png': path.resolve(__dirname, './src/assets/ddf5c2fe9865e875c3350ea6442b474e1d1cd62e.png'),
      'figma:asset/db50f6fd4711ea7eb7f741b3c26d60fffd6f7d54.png': path.resolve(__dirname, './src/assets/db50f6fd4711ea7eb7f741b3c26d60fffd6f7d54.png'),
      'figma:asset/d9ecddc07a2bb0aa28c4d94b406385ea677afdf6.png': path.resolve(__dirname, './src/assets/d9ecddc07a2bb0aa28c4d94b406385ea677afdf6.png'),
      'figma:asset/d31aae0e00a3c032d67c4eb7593caca3d5691733.png': path.resolve(__dirname, './src/assets/d31aae0e00a3c032d67c4eb7593caca3d5691733.png'),
      'figma:asset/cff7abf67463d0970810960be596b94145b93b24.png': path.resolve(__dirname, './src/assets/cff7abf67463d0970810960be596b94145b93b24.png'),
      'figma:asset/ce79a7c11724b2d1bfc337bcaa2ea79e12907506.png': path.resolve(__dirname, './src/assets/ce79a7c11724b2d1bfc337bcaa2ea79e12907506.png'),
      'figma:asset/cd3854edde95e7d95c8f3be5ee342626dd061fca.png': path.resolve(__dirname, './src/assets/cd3854edde95e7d95c8f3be5ee342626dd061fca.png'),
      'figma:asset/cc0283067ce656bd19ab11e061ae76d4a0df86d8.png': path.resolve(__dirname, './src/assets/cc0283067ce656bd19ab11e061ae76d4a0df86d8.png'),
      'figma:asset/cb3112923ab3b58270606fcfe8d0441c892afca9.png': path.resolve(__dirname, './src/assets/cb3112923ab3b58270606fcfe8d0441c892afca9.png'),
      'figma:asset/ca5fe9e99365a585292083e6acfcbb0395244023.png': path.resolve(__dirname, './src/assets/ca5fe9e99365a585292083e6acfcbb0395244023.png'),
      'figma:asset/c93be1fc85939baa10b7cab9649cebd186655436.png': path.resolve(__dirname, './src/assets/c93be1fc85939baa10b7cab9649cebd186655436.png'),
      'figma:asset/c84bf5fc5a4e8260702488d2efdf82729f330cd2.png': path.resolve(__dirname, './src/assets/c84bf5fc5a4e8260702488d2efdf82729f330cd2.png'),
      'figma:asset/c72d9d59101b6d3b0f79f13f0aeca6ad735aef65.png': path.resolve(__dirname, './src/assets/c72d9d59101b6d3b0f79f13f0aeca6ad735aef65.png'),
      'figma:asset/c562c10384fe8dc409f7effd9a6132fe1c78bf5a.png': path.resolve(__dirname, './src/assets/c562c10384fe8dc409f7effd9a6132fe1c78bf5a.png'),
      'figma:asset/c45e8c3310a8760b79ddc379894957a9dbc4f56b.png': path.resolve(__dirname, './src/assets/c45e8c3310a8760b79ddc379894957a9dbc4f56b.png'),
      'figma:asset/c0209ae3cfa35c80b09b6d8690a97b72b6fbbc30.png': path.resolve(__dirname, './src/assets/c0209ae3cfa35c80b09b6d8690a97b72b6fbbc30.png'),
      'figma:asset/b8a289023dcffbb75139847742fb391a77ee5ac1.png': path.resolve(__dirname, './src/assets/b8a289023dcffbb75139847742fb391a77ee5ac1.png'),
      'figma:asset/b7135ad237819d35487a64537eb8304fd6695bf1.png': path.resolve(__dirname, './src/assets/b7135ad237819d35487a64537eb8304fd6695bf1.png'),
      'figma:asset/b5abfe2d983db76755f90003671db021277cd0cb.png': path.resolve(__dirname, './src/assets/b5abfe2d983db76755f90003671db021277cd0cb.png'),
      'figma:asset/b26ad57bb2680a0dc30d25bdacd17aed2003e6d7.png': path.resolve(__dirname, './src/assets/b26ad57bb2680a0dc30d25bdacd17aed2003e6d7.png'),
      'figma:asset/afa1f84f18efc12e806b4f72c6311e9134a9f1de.png': path.resolve(__dirname, './src/assets/afa1f84f18efc12e806b4f72c6311e9134a9f1de.png'),
      'figma:asset/ad8630553bb17fbdecae960e3d0f203dd39c376d.png': path.resolve(__dirname, './src/assets/ad8630553bb17fbdecae960e3d0f203dd39c376d.png'),
      'figma:asset/ac973c4bc0ae1a02108cc9ce70148dc0d0e28111.png': path.resolve(__dirname, './src/assets/ac973c4bc0ae1a02108cc9ce70148dc0d0e28111.png'),
      'figma:asset/aae5ee3f19923d74b5219228f0053c8918f85a85.png': path.resolve(__dirname, './src/assets/aae5ee3f19923d74b5219228f0053c8918f85a85.png'),
      'figma:asset/a9ce756e5db98a19efc80d4d71065a7f255f3242.png': path.resolve(__dirname, './src/assets/a9ce756e5db98a19efc80d4d71065a7f255f3242.png'),
      'figma:asset/a4a50dd6d697a37ea3f028ed0a15295e53f98c09.png': path.resolve(__dirname, './src/assets/a4a50dd6d697a37ea3f028ed0a15295e53f98c09.png'),
      'figma:asset/a4a09538812d631cae47d9f561a58e8bc702fe4c.png': path.resolve(__dirname, './src/assets/a4a09538812d631cae47d9f561a58e8bc702fe4c.png'),
      'figma:asset/a4186f827742dfa2e7435e7545bbe3df834de587.png': path.resolve(__dirname, './src/assets/a4186f827742dfa2e7435e7545bbe3df834de587.png'),
      'figma:asset/a340d2c6e8dcbff93e53f0c53b9ffe6600247fb9.png': path.resolve(__dirname, './src/assets/a340d2c6e8dcbff93e53f0c53b9ffe6600247fb9.png'),
      'figma:asset/a2a63b674bdbe64a74378c8540b321453d897397.png': path.resolve(__dirname, './src/assets/a2a63b674bdbe64a74378c8540b321453d897397.png'),
      'figma:asset/a1577137ec1384a9dc5d1713160a3f2195d24e3f.png': path.resolve(__dirname, './src/assets/a1577137ec1384a9dc5d1713160a3f2195d24e3f.png'),
      'figma:asset/9e01cb1b3c7b9040cf93897070e320b0fd31725a.png': path.resolve(__dirname, './src/assets/9e01cb1b3c7b9040cf93897070e320b0fd31725a.png'),
      'figma:asset/98b3603a7a40d3d8f5a8896e3976f8bd198bd8c8.png': path.resolve(__dirname, './src/assets/98b3603a7a40d3d8f5a8896e3976f8bd198bd8c8.png'),
      'figma:asset/981674a51e042124c9681c0107d0aef1d134694a.png': path.resolve(__dirname, './src/assets/981674a51e042124c9681c0107d0aef1d134694a.png'),
      'figma:asset/97dd664bc1e7fab943695cde860425a3ace0c6bb.png': path.resolve(__dirname, './src/assets/97dd664bc1e7fab943695cde860425a3ace0c6bb.png'),
      'figma:asset/92a93c5baf7979b4513517affe07c56b46488257.png': path.resolve(__dirname, './src/assets/92a93c5baf7979b4513517affe07c56b46488257.png'),
      'figma:asset/90d5a28f34539dea0a471c5f5b6f610864688220.png': path.resolve(__dirname, './src/assets/90d5a28f34539dea0a471c5f5b6f610864688220.png'),
      'figma:asset/8df91e2e0c3906cd8be8217b237d9c8be25370b5.png': path.resolve(__dirname, './src/assets/8df91e2e0c3906cd8be8217b237d9c8be25370b5.png'),
      'figma:asset/8d75731740558e8ae67f94e6080289b6ae855101.png': path.resolve(__dirname, './src/assets/8d75731740558e8ae67f94e6080289b6ae855101.png'),
      'figma:asset/88cced24bb39aac025c3d87fa0e7982a19c3acf7.png': path.resolve(__dirname, './src/assets/88cced24bb39aac025c3d87fa0e7982a19c3acf7.png'),
      'figma:asset/883b416cccd56a33a52ffe0df5a37b13a12e0247.png': path.resolve(__dirname, './src/assets/883b416cccd56a33a52ffe0df5a37b13a12e0247.png'),
      'figma:asset/7dd4e27026e02d039b5c157df85fe1edb0067a58.png': path.resolve(__dirname, './src/assets/7dd4e27026e02d039b5c157df85fe1edb0067a58.png'),
      'figma:asset/7c9fee5a551fa9845ea57aed0c3abb13e0a9e154.png': path.resolve(__dirname, './src/assets/7c9fee5a551fa9845ea57aed0c3abb13e0a9e154.png'),
      'figma:asset/74cb16fdded8d1ee96a7b539c0ca516110520fa5.png': path.resolve(__dirname, './src/assets/74cb16fdded8d1ee96a7b539c0ca516110520fa5.png'),
      'figma:asset/717c220a8f29233ad802c7377356435aee8dcc2b.png': path.resolve(__dirname, './src/assets/717c220a8f29233ad802c7377356435aee8dcc2b.png'),
      'figma:asset/7128b5015c4d419ecea8745adaff9d08f060febd.png': path.resolve(__dirname, './src/assets/7128b5015c4d419ecea8745adaff9d08f060febd.png'),
      'figma:asset/70d76b54c38e05ba6eaa723deaee45e880faff1f.png': path.resolve(__dirname, './src/assets/70d76b54c38e05ba6eaa723deaee45e880faff1f.png'),
      'figma:asset/70617c341f4fc7e523e0c33c8a450d534da7cb15.png': path.resolve(__dirname, './src/assets/70617c341f4fc7e523e0c33c8a450d534da7cb15.png'),
      'figma:asset/6de98a50bb13365d4e2199e707b4e96574d9aea9.png': path.resolve(__dirname, './src/assets/6de98a50bb13365d4e2199e707b4e96574d9aea9.png'),
      'figma:asset/6d7bc987afcd66fddb7bc12fc5902d6b7cce50d7.png': path.resolve(__dirname, './src/assets/6d7bc987afcd66fddb7bc12fc5902d6b7cce50d7.png'),
      'figma:asset/69fed43ec8af9a8774f3bb08b17a077f8b4f76f4.png': path.resolve(__dirname, './src/assets/69fed43ec8af9a8774f3bb08b17a077f8b4f76f4.png'),
      'figma:asset/69a3ff801d5c28946ec33ced2fd03cf1afa34b1f.png': path.resolve(__dirname, './src/assets/69a3ff801d5c28946ec33ced2fd03cf1afa34b1f.png'),
      'figma:asset/682dcdc03e662482b7d6702f4a367acf9bc969c1.png': path.resolve(__dirname, './src/assets/682dcdc03e662482b7d6702f4a367acf9bc969c1.png'),
      'figma:asset/5d1a3407432a48a33e983ec01ef8b763c76e4711.png': path.resolve(__dirname, './src/assets/5d1a3407432a48a33e983ec01ef8b763c76e4711.png'),
      'figma:asset/5d0b398ad9ed28d2fc8dfc91b136d590ad7db509.png': path.resolve(__dirname, './src/assets/5d0b398ad9ed28d2fc8dfc91b136d590ad7db509.png'),
      'figma:asset/5b4445c1c4abdcb5613b0a7fc064e6e1cb4c5a10.png': path.resolve(__dirname, './src/assets/5b4445c1c4abdcb5613b0a7fc064e6e1cb4c5a10.png'),
      'figma:asset/597b183411eea87ecaa55ae1411c0760a3f18b59.png': path.resolve(__dirname, './src/assets/597b183411eea87ecaa55ae1411c0760a3f18b59.png'),
      'figma:asset/573817ad27ab8b33688ccbb35f2e34bd779d415f.png': path.resolve(__dirname, './src/assets/573817ad27ab8b33688ccbb35f2e34bd779d415f.png'),
      'figma:asset/56c7a95a11bc476e3340f1588a9348e6cf483539.png': path.resolve(__dirname, './src/assets/56c7a95a11bc476e3340f1588a9348e6cf483539.png'),
      'figma:asset/5493881b67e34604555cda365be60a475b3a7491.png': path.resolve(__dirname, './src/assets/5493881b67e34604555cda365be60a475b3a7491.png'),
      'figma:asset/546248196d595e6d4e062f40cb848cb1aabef3d7.png': path.resolve(__dirname, './src/assets/546248196d595e6d4e062f40cb848cb1aabef3d7.png'),
      'figma:asset/5392c744a97288a10791d960fac3d5a20937c9e2.png': path.resolve(__dirname, './src/assets/5392c744a97288a10791d960fac3d5a20937c9e2.png'),
      'figma:asset/4f3bab6996d6cae64f03a58c076a3fffac439a04.png': path.resolve(__dirname, './src/assets/4f3bab6996d6cae64f03a58c076a3fffac439a04.png'),
      'figma:asset/4f3447e87ea5efc6399d3f918c8ac821d04469ee.png': path.resolve(__dirname, './src/assets/4f3447e87ea5efc6399d3f918c8ac821d04469ee.png'),
      'figma:asset/4d2d6ea1fe7163fa54b6ab81402d54d7d450a53e.png': path.resolve(__dirname, './src/assets/4d2d6ea1fe7163fa54b6ab81402d54d7d450a53e.png'),
      'figma:asset/4c41363012829e7eadb1018aa51fac91365f481f.png': path.resolve(__dirname, './src/assets/4c41363012829e7eadb1018aa51fac91365f481f.png'),
      'figma:asset/4c1f0f30b39cbbef4b209a91a537ea15de9953d7.png': path.resolve(__dirname, './src/assets/4c1f0f30b39cbbef4b209a91a537ea15de9953d7.png'),
      'figma:asset/4a4445f9a6d4f88fef8e64984266a3d4179c9c5a.png': path.resolve(__dirname, './src/assets/4a4445f9a6d4f88fef8e64984266a3d4179c9c5a.png'),
      'figma:asset/4a35340fa22fb25cc72642063e1cd4810e453de2.png': path.resolve(__dirname, './src/assets/4a35340fa22fb25cc72642063e1cd4810e453de2.png'),
      'figma:asset/490247ccb83aa4cfff6cea3c70d615729daa21d9.png': path.resolve(__dirname, './src/assets/490247ccb83aa4cfff6cea3c70d615729daa21d9.png'),
      'figma:asset/4414bbc83b5efaadf524949b88ecd1086f1b4394.png': path.resolve(__dirname, './src/assets/4414bbc83b5efaadf524949b88ecd1086f1b4394.png'),
      'figma:asset/41838faca2e395e8d90f7ebb854e8fd978c7e805.png': path.resolve(__dirname, './src/assets/41838faca2e395e8d90f7ebb854e8fd978c7e805.png'),
      'figma:asset/3ecca6e32d9e515c91c0001461929dea539e6376.png': path.resolve(__dirname, './src/assets/3ecca6e32d9e515c91c0001461929dea539e6376.png'),
      'figma:asset/3e1a1526ff86d84511fcc67dd2b8e7cc6fc4d489.png': path.resolve(__dirname, './src/assets/3e1a1526ff86d84511fcc67dd2b8e7cc6fc4d489.png'),
      'figma:asset/3c091d5ff3c499a45e86ad2987bda0c8371700f3.png': path.resolve(__dirname, './src/assets/3c091d5ff3c499a45e86ad2987bda0c8371700f3.png'),
      'figma:asset/3b52f072886ed4447a06d4ba4fdb6cb7a5cc6e34.png': path.resolve(__dirname, './src/assets/3b52f072886ed4447a06d4ba4fdb6cb7a5cc6e34.png'),
      'figma:asset/377bb5599437aea21b762a776405e46e9f27c644.png': path.resolve(__dirname, './src/assets/377bb5599437aea21b762a776405e46e9f27c644.png'),
      'figma:asset/35e57f0417a22480ba69edee9761e06a5a1836d1.png': path.resolve(__dirname, './src/assets/35e57f0417a22480ba69edee9761e06a5a1836d1.png'),
      'figma:asset/30daf837dbeb1a00dcca2aa9651977b9b2d0dcad.png': path.resolve(__dirname, './src/assets/30daf837dbeb1a00dcca2aa9651977b9b2d0dcad.png'),
      'figma:asset/2db3569a2c818a5d6b5d33ac69d8cf23bd58601e.png': path.resolve(__dirname, './src/assets/2db3569a2c818a5d6b5d33ac69d8cf23bd58601e.png'),
      'figma:asset/281e7ff23390688f24ed36c1f61c2e95e53cfc67.png': path.resolve(__dirname, './src/assets/281e7ff23390688f24ed36c1f61c2e95e53cfc67.png'),
      'figma:asset/24c390ac003a4b49ebd1fb6414176c47d1d78832.png': path.resolve(__dirname, './src/assets/24c390ac003a4b49ebd1fb6414176c47d1d78832.png'),
      'figma:asset/1d38a37c027b4a9ab938ce515379bfdb793ec84a.png': path.resolve(__dirname, './src/assets/1d38a37c027b4a9ab938ce515379bfdb793ec84a.png'),
      'figma:asset/188b17bb31b62592504df73220f0b92a4fcb6bdf.png': path.resolve(__dirname, './src/assets/188b17bb31b62592504df73220f0b92a4fcb6bdf.png'),
      'figma:asset/15aae33c041ff843eeab94df624a5bfa0e2306e1.png': path.resolve(__dirname, './src/assets/15aae33c041ff843eeab94df624a5bfa0e2306e1.png'),
      'figma:asset/1308d994682acb288ada2794b0227489df115885.png': path.resolve(__dirname, './src/assets/1308d994682acb288ada2794b0227489df115885.png'),
      'figma:asset/126cbbc37f833ec1802d3cd3bd94b942f4581ed4.png': path.resolve(__dirname, './src/assets/126cbbc37f833ec1802d3cd3bd94b942f4581ed4.png'),
      'figma:asset/0fdaf9af501215846e1f02a497878767ca49cad4.png': path.resolve(__dirname, './src/assets/0fdaf9af501215846e1f02a497878767ca49cad4.png'),
      'figma:asset/0cb0d85ec14ea9e933485d6c7dce7a9541936b62.png': path.resolve(__dirname, './src/assets/0cb0d85ec14ea9e933485d6c7dce7a9541936b62.png'),
      'figma:asset/0b42428e94a09d1e4ef6954723c9e8d8ef37bef6.png': path.resolve(__dirname, './src/assets/0b42428e94a09d1e4ef6954723c9e8d8ef37bef6.png'),
      'figma:asset/0aaf3d04721e910224d19322fffb0982fccaf16c.png': path.resolve(__dirname, './src/assets/0aaf3d04721e910224d19322fffb0982fccaf16c.png'),
      'figma:asset/0697701a4e4f11976dd3f5e37bf95191a659553c.png': path.resolve(__dirname, './src/assets/0697701a4e4f11976dd3f5e37bf95191a659553c.png'),
      'figma:asset/050c9c827aa7bb8774c992a31d56446a1d225272.png': path.resolve(__dirname, './src/assets/050c9c827aa7bb8774c992a31d56446a1d225272.png'),
      'figma:asset/02e2c936052f659e756874d9dedee0beb39259bb.png': path.resolve(__dirname, './src/assets/02e2c936052f659e756874d9dedee0beb39259bb.png'),
      'figma:asset/01af1c83b759ce25ceefb393d0206308e685875c.png': path.resolve(__dirname, './src/assets/01af1c83b759ce25ceefb393d0206308e685875c.png'),

      // ---------- CLEAN PATH ALIASES (from first config) ----------
      // Allows imports like `import Component from '@/components/Component'`
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/utils': path.resolve(__dirname, './src/utils'),
      '@/styles': path.resolve(__dirname, './src/styles'),
      // (Add more sub‑path aliases here if needed – e.g., '@/lib', '@/hooks')
    },
  },

  // ---------------------------------------------------------------------
  // DEVELOPMENT SERVER – merged from both configs
  // ---------------------------------------------------------------------
  server: {
    host: '0.0.0.0',        // Listen on all network interfaces (from first config)
    port: 3001,             // Preferred port (both configs)
    strictPort: true,       // Fail if port 3000 is not available (from first config)
    hmr: {
      clientPort: 3001,     // WebSocket port for HMR (from first config)
      overlay: false,
    },
    open: true,             // Automatically open browser on start (from second config)
  },

  // ---------------------------------------------------------------------
  // BUILD – optimized production settings (from first config)
  // ---------------------------------------------------------------------
  build: {
    target: 'esnext',                   // Modern browsers
    minify: 'esbuild',                 // Fast, efficient minification
    sourcemap: false,                  // No source maps in production
    outDir: 'dist',                   // Standard output folder (kept from first)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'motion'],
          utils: ['sonner'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,       // Warn if chunks exceed 1000 kB
  },

  // ---------------------------------------------------------------------
  // OPTIMIZE DEPS – pre-bundle for faster dev startup (from first config)
  // ---------------------------------------------------------------------
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'motion'],
  },

  // ---------------------------------------------------------------------
  // DEFINE – inject environment variables (from first config)
  // ---------------------------------------------------------------------
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
});