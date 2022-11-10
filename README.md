# adversarial examples detector

**adversarial examples detector** is a application to test your unnoticeability of your adversarial examples. 

if your paper want to involves **experiments related to human perception of the unnoticeability of your adversarial examples**, this app will help you.

you may ask for volunteers to help you **manually** determine whether some images are adversarial examples.

该应用是一个桌面应用，用来测试你的对抗样本的隐秘性。

如果你的论文中想要包含关于人类检测对抗样本相关的实验，这个应用会有帮助。

你可能需要几个志愿者来手动判断每个图片是不是对抗样本。



## Usage

for start, you need to input the locations of the adversarial examples, each path should related to a attack method.

you also need to input the location of the clean examples.

首先，你需要输入你的对抗样本的目录。这里可能包含多个目录，每个目录对应一个对抗攻击方法所生成的对抗样本。

你也需要输入干净样本的位置。

<img src="https://github.com/a772316182/adversarial_examples_detector/raw/master/image-20221110202929095.png" alt="image-20221110202929095" style="zoom: 50%;" />

然后，你需要勾选对抗样本。

then, you need to checkout the adversarial examples.

 

<img src="https://github.com/a772316182/adversarial_examples_detector/raw/master/image-20221110202009167.png" alt="image-20221110202009167" style="zoom: 50%;" />

you can click the image to enable the zoom window. the left is the clean example, and the right is the "adversarial example" you clicked. if you can not tell them part, this may clean example, otherwise adversarial example.

你可以点击图片进入放大的界面，左边的是干净样本，右边的是你点击的”对抗样本“。如果你无法分辨这两张图片的差别，你可以认为这不是对抗样本。

<img src="https://github.com/a772316182/adversarial_examples_detector/raw/master/image-20221110204025156.png" alt="image-20221110204025156" style="zoom: 50%;" />

最后，点击提交，你可以看到结果

finally, click the submit button, and you can see the answers.

<img src="https://github.com/a772316182/adversarial_examples_detector/raw/master/image-20221110202633682.png" alt="image-20221110202633682" style="zoom:80%;" />



## Download

我们已经打包好了Windows平台上的一个测试版本，里面包含用来测试的对抗样本。

下载并解压该文件，然后运行**electron.exe**来进行试用。

This is a desktop application, powered by electron, and we have build **a example version** for Windows, which include the adversarial examples for test.

you can download and unzip this file, then run **electron.exe** to start.

[portable] https://drive.google.com/file/d/13RySxNkzY4xek6o3J1ao8G1wj2ewtLYF/view?usp=share_link
