<template>
  <v-container>
    <div style="margin: 50px">
      <v-alert type="info">
        <ul>
          <li>
            The way to sort out the matching relationship between clean and adversarial examples is to do a file name match, using the index_of function of the string type
          </li>
          <li>
            For example, the clean sample name is x_0.png
          </li>
          <li>
            then its corresponding adversarial examples must also contain x_0.png, such as alpha_x_0.png, beta@x_0_png, 999*x_0.png
          </li>
          <li>
            Note that names like x_0delta.png cannot be matched
          </li>
          <li>
            Therefore, please make sure to name the images well
          </li>
        </ul>
      </v-alert>
    </div>

    <v-text-field label="PATH of CLEAN EXAMPLES" v-model="clean_path"></v-text-field>

    <v-text-field label="NEW PATH of ADV EXAMPLES" v-model="adv_path"></v-text-field>
    <v-btn block color="primary" @click="addAdvPath">add new adversarial examples path</v-btn>
    <br>
    <v-btn block color="warning" @click="clear_path">clear all adversarial examples paths</v-btn>

    <br>
    <br>
    <v-card>
      <v-card-subtitle>ALL PATH of ADV EXAMPLES</v-card-subtitle>
      <v-card-text>
        <template v-for="item in adv_paths">
          <v-text-field :value="item" disabled></v-text-field>
        </template>
      </v-card-text>
    </v-card>
    <br>
    <br>
    <v-btn block color="error" @click="next">NEXT</v-btn>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      clean_path: './clean',
      adv_path: '',
      adv_paths: [
        './att1',
        './att2',
        './att3'
      ],
    }
  },
  methods: {
    clear_path(){
      this.adv_paths = []
    },
    addAdvPath() {
      this.adv_paths.push(this.adv_path)
    },
    next() {
      this.$router.push({
        path: '/JudgeView',
        query: {
          adv_paths: this.adv_paths,
          clean_path: this.clean_path
        }
      })
    }
  }
}
</script>
