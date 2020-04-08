const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profiles');

// $route  GET api/profile
// @desc   获取当前登录用户的个人信息
// @access private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = '该用户的信息不存在~!';
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// $route  POST api/profile/add
// @desc   创建朋友圈信息接口
// @access private
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const profileFields = {};
    if (req.body.img) profileFields.img = req.body.img;
    if (req.body.name) profileFields.name = req.body.name;
    if (req.body.text) profileFields.text = req.body.text;

    // skills - 数组转换
    if (req.body.imgs) {
      profileFields.imgs = req.body.imgs.split('|');
    }

    new Profile(profileFields).save().then(profile => res.json(profile));
  }
);

// $route  GET api/profile/:page/:size
// @desc   上拉加载的接口
// @access private
router.get(
  '/:page/:size',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.find()
      .sort({ date: -1 })
      .then(profiles => {
        if (!profiles) {
          res.status(404).json('没有任何用户信息');
        } else {
          let size = req.params.size;
          let page = req.params.page;
          let index = size * (page - 1);
          let newProfiles = [];
          for (let i = index; i < size * page; i++) {
            if (profiles[i] != null) {
              newProfiles.unshift(profiles[i]);
            }
          }
          res.json(newProfiles);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

// $route  GET api/profile/latest
// @desc   下拉刷新的接口
// @access private
router.get(
  '/latest',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.find()
      .sort({ date: -1 })
      .then(profiles => {
        if (!profiles) {
          res.status(404).json('没有任何用户信息');
        } else {
          let newProfiles = [];
          for (let i = 0; i < 3; i++) {
            if (profiles[i] != null) {
              newProfiles.push(profiles[i]);
            }
          }
          res.json(newProfiles);
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
