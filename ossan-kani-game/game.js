const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#87CEEB', // 空色の背景
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: {
        preload,
        create,
        update
    }
};

let game = new Phaser.Game(config);

let player;
let crabs;
let score = 0;
let scoreText;

function preload() {
    this.load.image('player', 'images/ossan.png');
    this.load.image('crab', 'images/kani.png');
}

function create() {
    // プレイヤー（おっさん）を配置
    player = this.physics.add.sprite(config.width / 2, config.height / 2, 'player');
    player.setScale(0.5);
    player.setCollideWorldBounds(true);

    // 蟹グループ作成
    crabs = this.physics.add.group();

    // スコア表示
    scoreText = this.add.text(16, 16, 'カニ: 0', {
        fontSize: '24px',
        fill: '#ffffff',
        fontFamily: 'sans-serif'
    });

    // 一定間隔で蟹を出現
    this.time.addEvent({
        delay: 1000, // 1秒ごと
        callback: spawnCrab,
        callbackScope: this,
        loop: true
    });

    // プレイヤーと蟹の接触判定
    this.physics.add.overlap(player, crabs, collectCrab, null, this);

    // タッチ操作（スマホ対応）
    this.input.on('pointermove', function (pointer) {
        player.x = pointer.x;
        player.y = pointer.y;
    }, this);
}

function update() {
    // 特に動かさない（タップ操作だけで移動）
}

function spawnCrab() {
    const x = Phaser.Math.Between(50, config.width - 50);
    const y = Phaser.Math.Between(50, config.height - 50);
    const crab = crabs.create(x, y, 'crab');
    crab.setScale(0.5);
}

function collectCrab(player, crab) {
    crab.destroy();
    score += 1;
    scoreText.setText('カニ: ' + score);
}
