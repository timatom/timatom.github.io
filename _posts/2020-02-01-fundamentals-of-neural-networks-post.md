---
layout: post
title: Fundamentals of Neural Networks and Deep Learning
tags: [tutorials, neural networks, deep learning]
---

## Introduction

This is a beginners tutorial to all things neural networks and deep learning. A lot of this is an accumulation of my own studies and exploration into neural networks, all compiled and digested here into a self contained study of them. My hopes are that this will cover both the theoretical and practical/experimental side of neural networks, as well as how both come together. Too many times theoretical and experimental material tend to lead readers away from each other. Hopefully, this will help releave some of the resulting blind spots we all find ourselves having to bridge.

Something to know now is that these tutorials will be long, but thorough. It wouldn't be surprising if they take a few days to go through. But once finished, you should have a good knowledge of the fundamentals in neural networks. I'll start by covering what neural networks and neurons are intuitively and how machine learning got it's insperation from them. Then, we'll move on to some applications they've been successfully used for. We'll also see in that section current room for future applications of NN's (Neural Networks). After we've covered what NN's intuitively are and their applications, we'll start to explore their fundamentals (logistic regression, shallow and deep NN's, forward/backward-propagation, associated mathematics, etc.).

After finishing this tutorial, you should be able to code neural networks with a lot of knowledge as to how they work and their associated mathematics. You should have no problem moving on to further topics. Anyways, let's get started!

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

So what are neural networks? What are the neurons and synapses that make them? The human brain is a network of more than 100 billion individual
nerve cells interconnected in neural circuits that manefest into our perception of the world and guide our actions. Nerve cells with similar
properties can still give very different actions, simply based on how they are interconnected. [principles of neural science, Ebook location 2477]
Among all these cells, there are actually two fundamental cells that create the complicated networks of the brain: Neurons and glial cells.
These cells, while located in the brain, are also located in the spinal chord.

![Structure of neuron](https://upload.wikimedia.org/wikipedia/commons/a/a9/Complete_neuron_cell_diagram_en.svg)

The above figure is a depiction of a generic neuron, even though they can very quite drastically. Neurons in their most basic form
consist of four morhphological regions: axons, dendrites, presynaptic terminals, and the cell's body (also called the soma).
Together, these help the neuron generate signals and communicate with other brain cells.

To get a better understanding, though, let's dig a little deeper into the details of these regions and what roles they play within [the structure of a neuron](https://www.khanacademy.org/science/biology/human-biology/neuron-nervous-system/v/anatomy-of-a-neuron):

### Dendrites
A [dendrite](https://en.wikipedia.org/wiki/Dendrite) genrally function as the reciever and processor of incoming signals into the neruon. The signals it
recieve can either be those which help excite or inhibit action potentials (more about that in a bit) within the neuron's body. It is also covered in many small bumps known as [spines](https://en.wikipedia.org/wiki/Dendritic_spine).

Within a given neuron, there can be one dendrite connection (like [bipolar neurons](https://en.wikipedia.org/wiki/Retina_bipolar_cell) in
[the retina](https://www.ncbi.nlm.nih.gov/books/NBK10885/)) to as many as hundreds of thousands (like [Purkinje cells](https://en.wikipedia.org/wiki/Purkinje_cell) located in the cerebellum).

The sum of all the input signals (both excitory and inhibitory) recieved and processed by these dendrite connections may then cause an action potential within the cell's body (also called soma) to be sent from the axon hillock (again, more on this in a bit) down the axon to one (or more) synapse.

### The Cell's Body (or Soma)
Within the cell's body, a signal may be created which the axon send to one (or more) synapse. The signal is really an [action potential](https://en.wikipedia.org/wiki/Action_potential) created by a depolarizing current. This depolarizing current comes from an external event which stimulates the neuron's [sodium-potassium pump](https://www.khanacademy.org/science/biology/human-biology/neuron-nervous-system/v/sodium-potassium-pump). Given the right stimulus, if the depolorization of the neuron reaches -55 mV, the threshold is reached and the neuron responds by firing an action potential. This action potential, when created, is sent from the starting portion of the axon to the associated [synapse](https://www.khanacademy.org/science/biology/human-biology/neuron-nervous-system/v/neuronal-synapses-chemical).

While the sodium-potassium pump is typically seen as only used for house keeping, more evidence suggests it may indeed be a computational element of the cerebellum (or brain in general). For example, it's suggested it plays a key role in [setting the activity mode of the Purkinje neuron](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3527461/). It's also been shown to play a role in [electrical activity in accessory olfactory bulb mitral cells](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1002319) as well. Finally, not too long ago, it has been suggested that the way sodium concentration changes slowly in time within certain neurons [increases the time for their neuronal integration](https://www.frontiersin.org/articles/10.3389/fncom.2017.00085/full).

This detail may not seem to matter much for this tutorial, maybe very little of all these details do. However, for all you involved (or on a path to be) in research it is an important note to make when considering how accurate we are respresenting neurons in machine learning today. If our goal is to eventually create systems that reach a general intelligence similar to our own, it helps to consider as much as we can regarding what makes us ourselves intelligent.

### Axon
Generally, axons help transmit signals for the neuron, namely the action potential previously discussed. They very greatly in length, so greatly that some extend beyond 2 meter within the body... quite a distance when you think of it. In the central nervous system (where all of our information processing takes place), they are typically very thin. Their diameters range between 0.2 micro-meters to 20 micro-meters.

Along the neuron, they begin at what is called the [axon hillock](https://en.wikipedia.org/wiki/Axon_hillock). They are covered by [myelin](https://en.wikipedia.org/wiki/Myelin) called the Schwann cell, which is interupted in small intervals called the [nodes of Ranvier](https://www.ncbi.nlm.nih.gov/books/NBK537273/).

### Presynaptic Axon Terminal
The presynaptic [axon terminals](https://en.wikipedia.org/wiki/Axon_terminal) are at the very end of the axon's branches (also called telodendria),
which are used to send [neurotransmitters](https://en.wikipedia.org/wiki/Neurotransmitter) to other target cells (which could be the soma or dendrites of a target neuron, a [muscle cell](https://en.wikipedia.org/wiki/Myocyte), or a [gland cell](https://en.wikipedia.org/wiki/Gland)). They appear as tiny bulbous swellings at the end of many telodendria.

I'll conlcude this section with a brief disclaimer. I by no means claim to be an expert in biology or neuroscience. I am simply a nerd who loves to learn about these things! If you want a deeper study into a lot of the fundamentals in neruoscience, I highly recomend "Principles of Neural Science" by Kandel, Schwartz, Jessell, Siegelbaum, and Hudspeth. I'm not mentioning this book for any marketing purposes, I just really like the book. A lot of what I'm covering in this section can be found in it, and much more interesting information.

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
