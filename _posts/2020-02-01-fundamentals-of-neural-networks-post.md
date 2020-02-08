---
layout: post
title: Fundamentals of Neural Networks and Deep Learning
tags: [tutorials, neural networks, deep learning]
---

## Introduction

This is a beginners tutorial to all things neural networks and deep learning.
A lot of this is an accumulation of my own studies and exploration into neural
networks, all compiled and digested here into a self contained study of them.
My hopes are that this will cover both the theoretical and practical/experimental side of
neural networks, as well as how both come together. Too many times theoretical and
experimental material tend to lead readers away from each other. Hopefully,
this will help releave some of the resulting blind spots we all find ourselves
having to bridge.

Something to know now is that these tutorials will be long, but thorough. It wouldn't be surprising if they take a few days to go through. But once finished, you should have a good knowledge of the fundamentals in neural networks. I'll start by covering what neural networks and neurons are intuitively and how machine learning got it's insperation from them. Then, we'll move on to some applications they've been successfully used for. We'll also see in that section current room for future applications of NN's (Neural Networks). After we've covered what NN's intuitively are and their applications, we'll start to explore their fundamentals (logistic regression, shallow and deep NN's, forward/backward-propagation, associated mathematics, etc.).

After finishing this tutorial, you should be able to code neural networks with a lot of knowledge as to how they work and their associated mathematics. You should have no problem moving on to further topics, such as optimizing hyperparameters of NN's. Anyways, let's get started!

### Table of Content

1. Neural Networks within Neuroscience
2. Neural Networks within Machine Learning
3. Knowing Your Data
4. The Basic Components in Neural Networks: Logistic Regression, Computational Graphs, and Backpropagation
5. Basic Neural Networks
6. Deep Neural Networks

## Neural Networks within Neuroscience

Through the years, a lot has been brought up about neural networks in our machine learning community, especially related to deep learning.
However, to truly understand where these insperations came from, we need to understand neural networks and neurons themselves.

So what are neural networks? What are the neurons and synapsys that make them?

## Neural Networks within Machine Learning

Now that we understand how much is known about neural networks and their basic units in neuroscience, the next question is what applications have they had in computer science and machine learning. Also, what are their potential applications in the future?

## Knowing Your Data

Before we get into the specifics of neural networks, we first need to understand the data we'll be giving them. While this section could really be made into its own tutorial, it's worth including here if even briefly. If you talk to a lot of data scientists, machine learning practitioniers, and researchers, you'll eventually hear one complain just how much time they have to put into making the data clean and structured for their models. I myself didn't think much about this until I started working with neural networks (and machine learning models in general) in the real world. It can actually get very complicated, and sometimes just not possible to deal with.

Even at times, a lot of companies simply see "machine learning" and want to put any data they have through a model, with little idea how it will work (if at all), only to walk away dissapointed. Was it machine learning that failed? Typically not, there are plenty of Kaggle competition results to suggest just how well models can perform. Was it the data scientist or machine learning researcher who simply performed poorly? Could be, but then again it is only becoming easier and easier to make machine learning applications (AutoML being a good example). Then what could it be?! While it typically isn't one thing, it usually revolves around not understanding how real world data is cleaned and structured into model-ready data sets. Hopefully after this section, you'll know how to clean and structure real world data for your models (or if they even can be).

## The Basic Components in Neural Networks: Logistic Regression, Computational Graphs, and Backpropagation

I'm sure you're ready to start understanding how our respresentations of neural networks are created. The good news is that starts now.

## Shallow Neural Networks

Since we now understand the basic building blocks that make up our representation of neural network, we now turn to creating a full-fledged netowork. It'll be a basic network, but a neural network nonetheless.

## Deep Neural Networks

Now that we created our first shallow neural network, we're ready to go even deeper (pun intended). This time, we'll create a deep neural network with 5 hidden layers.

## Final Statements

So you made it to the end, with several cups of coffee and naps nodoubt. If you came this far and followed everything in this tutorial, you likely learned a lot about neural networks, their insperations in computer science and machine learning, their underlying mathematics, and how they can be made from scratch. I'll end this tutorial with some of my own personal statements on them and my thoughts on their future.
