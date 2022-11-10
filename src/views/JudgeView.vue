<template>
  <div>
    <v-app-bar dark color="primary">
      <h3>which are adversarial examples?</h3>
    </v-app-bar>

    <v-container>
      <v-card v-for="key in adv_image_map.keys()" style="margin-bottom: 10px">
        <v-card-title>
          &nbsp;&nbsp;
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <img :src="clean_image_map.get(key).URL" width="200px" @click="show(clean_image_map.get(key).URL)"></img>
            </v-col>
            <v-col v-for="item in adv_image_map.get(key)">
              <img :src="item.URL" width="200px" @click="show_cat_image(item, clean_image_map.get(key))"></img>
              <v-checkbox
                  v-model="item.is_adv"
                  label="Adversarial example"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <div v-if="submited">
        <v-card style="margin-top: 80px">
          <v-card-title>Results</v-card-title>
          <v-card-text>
            <v-alert type="warning" outlined>
              wrongly detected <b>{{ acc_on_each_dir_map.get('clean') }}</b> adversarial examples in <b>clean
              examples</b>
            </v-alert>
            <template v-for="k in acc_on_each_dir_map.keys()">
              <v-alert type="info" outlined v-if="k !== 'clean'">
                successfully detected <b>{{ acc_on_each_dir_map.get(k) }}</b> adversarial examples in dir
                <b>{{ k.toString().replace('/', '') }}</b>
              </v-alert>
            </template>
          </v-card-text>
        </v-card>
      </div>

      <v-btn color="primary" block @click="submit">
        SUBMIT YOUR ANSWER
      </v-btn>

    </v-container>
  </div>
</template>

<script>
import {load_images, shuffle} from "@/plugins/file_reader";


export default {
  name: "JudgeView",
  data() {
    return {
      clean_path: '',
      adv_paths: [],
      adv_image_map: {},
      clean_image_map: {},
      acc_on_each_dir_map: new Map(),
      submited: false,
      clean_adv_images: []
    }
  },
  methods: {
    show(url) {
      this.$viewerApi({
        images: [url]
      })
    },
    show_cat_image(adv, clean) {
      let adv_instance = new Image()
      adv_instance.src = adv.URL
      let clean_instance = new Image()
      clean_instance.src = clean.URL

      const height = adv.info.height + 20
      const width = adv.info.width
      const final_width = adv.info.width * 2
      const encoderOptions = 1
      const canvas = document.createElement('canvas')
      canvas.height = height;
      canvas.width = final_width;
      const context = canvas.getContext('2d')
      let x = 0
      context.drawImage(clean_instance, x, 0, width, height)
      x += width
      context.drawImage(adv_instance, x, 0, width, height)
      context.strokeText("center", 450, 560);
      let url = canvas.toDataURL('image/jpeg', encoderOptions);
      this.$viewerApi({
        images: [url]
      })
    },
    submit() {
      let acc_on_each_dir = new Map()
      this.adv_image_map.forEach((v, k) => {
        v.forEach(adv_image => {
          if (adv_image.ground_truth_adv_label === true && adv_image.is_adv === true) {
            let acc = acc_on_each_dir.get(adv_image.path)
            if (acc)
              acc_on_each_dir.set(adv_image.path, acc + 1)
            else acc_on_each_dir.set(adv_image.path, 1)
          }
          if (adv_image.ground_truth_adv_label === false && adv_image.is_adv === true) {
            let acc = acc_on_each_dir.get('clean')
            if (acc)
              acc_on_each_dir.set('clean', acc + 1)
            else acc_on_each_dir.set('clean', 1)
          }
        })
      })

      this.acc_on_each_dir_map = acc_on_each_dir
      this.submited = true
    },
  },
  async beforeMount() {
    let adv_image_map = new Map();
    let clean_image_map = new Map();


    this.clean_path = this.$route.query.clean_path
    this.adv_paths = this.$route.query.adv_paths

    let clean_images = load_images(this.clean_path)

    let adv_images = []
    for (const item of this.adv_paths) {
      adv_images.push(load_images(item))
    }
    adv_images.push(load_images(this.clean_path))

    /** 整理干净样本和对抗样本之间的匹配关系，目前的方法是做文件名的匹配，使用的是index_of函数
     *
     * 例如，干净样本名称为x_0.png
     * 则其对应的对抗样本也必须包含x_0.png，如 alpha_x_0.png, beta@x_0_png, 999*x_0.png
     * 注意x_0delta.png之类的名称是无法匹配到的
     * 因此，请务必做好图片的命名工作
     */
    clean_images.forEach(clean_item => {
      let clean_name = clean_item.filename
      clean_image_map.set(clean_name, clean_item)
      if (!adv_image_map.has(clean_name))
        adv_image_map.set(clean_name, [])

      adv_images.forEach(adv_images_array => {
        adv_images_array.forEach(adv_image => {
          let adv_name = adv_image.filename;

          if (adv_name.indexOf(clean_name) !== -1) {
            adv_image.is_adv = false
            adv_image.ground_truth_adv_label = false
            this.adv_paths.forEach(path => {
              if (adv_image.path.indexOf(path) !== -1) {
                adv_image.ground_truth_adv_label = true
              }
            })
            let corresponding_adv_images = adv_image_map.get(clean_name)
            corresponding_adv_images.push(adv_image)
            adv_image_map.set(clean_name, JSON.parse(JSON.stringify(corresponding_adv_images)))
          }
        })
      })
    })

    adv_image_map.forEach((v, k) => {
      adv_image_map.set(k, shuffle(v))
    })

    this.clean_image_map = clean_image_map
    this.adv_image_map = adv_image_map
  }
}
</script>

<style scoped>

</style>
