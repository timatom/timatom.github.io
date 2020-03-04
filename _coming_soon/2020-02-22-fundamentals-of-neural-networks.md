## Introduction
This is a beginner's tutorial for all things neural networks and deep learning. A lot of this is an accumulation of my own studies and exploration into neural networks, all compiled and digested here into a self contained study. My hopes are that this will cover the theoretical, experimental and applicable sides of neural networks, as well as how they all come together. Often times these different perspectives tend to lead readers away from each other. Hopefully, this will help relieve some of the resulting blind spots we all find ourselves having to bridge.

Something to know now is that these tutorials will be long, but thorough. It wouldn't be surprising if they take a few days to go through. But it isn't all that surprising given we are exploring neural networks in many different perspectives. Once finished, you should have a good knowledge of the fundamentals of neural networks in a deep way. I'll start by covering neural networks and neurons within neuroscience and how machine learning got it's inspiration from them. Then, we'll move on to some successful applications they've been used for. We'll also see in that section current room for future applications of NN's (Neural Networks). After we've covered what NN's intuitively are and their applications, we'll start to explore their fundamentals (logistic regression, shallow and deep NN's, forward/backward-propagation, associated mathematics, etc.).

After finishing this tutorial, you should be able to code neural networks with a thorough knowledge as to how they work. You should have no problem moving on to further topics. Anyways, let's get started!

### Table of Content
1. Neural Networks within Neuroscience
2. Neural Networks within Machine Learning
3. Knowing Your Data
4. The Basic Components in Neural Networks: Logistic Regression, Computational Graphs, and Backpropagation
5. Shallow Neural Networks
6. Deep Neural Networks

## Neural Networks within Neuroscience
Through the years, a lot has been brought up about neural networks in the machine learning community, especially in deep learning.
However, to truly understand where these inspirations came from, we need to understand neural networks and neurons themselves.

<img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Complete_neuron_cell_diagram_en.svg" alt="Drawing" style="width: 700px;"/>

If you've ever taken a course in microbiology, you likely already know what the above figure is. This figure is a cellular diagram of a neuron, even though some features can vary drastically among different types of neurons. Neurons can be divided into four morphological regions: axons, dendrites, presynaptic axon terminals, and the cell's body. Together, these help the neuron generate signals and communicate with other brain cells, i.e., neurons and [glial cells](https://en.wikipedia.org/wiki/Glia). All of these communications collectively form how we see the world, our sense of smell, our ideas, our dreams, what makes us fear something or love it. All of the actions and decisions we ever made, at some point, were made from this vast number of communications in our brain.

Our brain is an ecosystem of neurons and glial cells. And while it is controversial in the neuroscience community, it is becoming more accepted that there are about [85 billion glial cells and 86 billion neurons](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5063692/#S25title) in the human brain. Among these brain cells, neurons are typically seen as the primary components of information processing in our CNS (central nervous system). Glial cells, on the other hand, are for supporting neurons through [homeostasis](https://en.wikipedia.org/wiki/Homeostasis) and [myelin](https://en.wikipedia.org/wiki/Myelin) formation, to name a few. The interconnections between individual neurons in the form of neural circuits manifest into our perception of the world and guide our every action. And neurons with similar properties still give very different responses, simply based on how they are interconnected. While glial cells certainly play an important role in the brain, this tutorial will mainly focus on neurons due to their current applications in computer science. It may prove important in later versions of this tutorial to include them, but for now they will remain left out.

To get a better understanding of neurons, though, let's dig a little deeper into the details of these regions and what roles they play within [the structure of a neuron](https://www.khanacademy.org/science/biology/human-biology/neuron-nervous-system/v/anatomy-of-a-neuron).

### Dendrites

A [dendrite](https://en.wikipedia.org/wiki/Dendrite) generally functions as the receiver and processor of incoming signals from other neurons or brain cells. These signals are then passed to the neuron's body, also called the [soma](https://en.wikipedia.org/wiki/Soma_(biology)). The signals it receives can either be those which help excite or inhibit action potentials (more about that in a bit) within the neuron's body. The sum of all the input signals received and processed by these dendritic connections may then cause an action potential within the cell's body to be sent from the axon hillock (again, more on this in a bit) down the axon to one (or more) synapse.

<img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/All_that_glitters_in_the_brain.jpg" alt="Drawing" style="width: 500px;"/>

Within a given neuron, there can be one dendritic connection (like [bipolar neurons](https://en.wikipedia.org/wiki/Retina_bipolar_cell) in
[the retina](https://www.ncbi.nlm.nih.gov/books/NBK10885/)) to as many as hundreds of thousands (like [Purkinje cells](https://en.wikipedia.org/wiki/Purkinje_cell) located in the cerebellum), each covered in many small bumps known as [spines](https://en.wikipedia.org/wiki/Dendritic_spine). A neuron may easily receive thousands of input signals through its dendrites, as is the case for Purkinje cells, which may contribute to an action potential.


### The Cell's Body (or Soma)

<img src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Neuron_Cell_Body.png" alt="Drawing" style="width: 600px;"/>

Within a neuron cell's body, a signal may be created, which is then sent by the axon. This signal is really an [action potential](https://www.khanacademy.org/science/biology/human-biology/neuron-nervous-system/v/electrotonic-action-potential) created by a depolarizing current. This depolarizing current comes from an external event which stimulates the neuron's [sodium-potassium pump](https://www.khanacademy.org/science/biology/human-biology/neuron-nervous-system/v/sodium-potassium-pump). Given the right stimulus, if the depolarization of the neuron reaches -55 mV, the threshold is reached and the neuron responds by firing an action potential. This action potential, when created, is sent from the starting portion of the axon to the associated [synapse](https://www.khanacademy.org/science/biology/human-biology/neuron-nervous-system/v/neuronal-synapses-chemical).

<figure class="half" style="display:flex">
    <img style="width:400px" src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Action_potential.svg">
    <img style="width:400px" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Action_Potential.gif">
</figure>

While the sodium-potassium pump is typically seen as only used for house keeping, more evidence suggests it may indeed be a computational element of the cerebellum (or brain in general). For example, it's suggested it plays a key role in [setting the activity mode of the Purkinje neuron](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3527461/). It's also been shown to play a role in [electrical activity in accessory olfactory bulb mitral cells](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1002319) as well. Finally, not too long ago, it has been suggested that the slowly changing sodium concentration within certain neurons [increases the time for their neuronal integration](https://www.frontiersin.org/articles/10.3389/fncom.2017.00085/full).

This detail may not seem to matter much for this tutorial, maybe very little of all these details do. However, for everyone involved (or on a path to be) in research it is an important note to make when considering how accurate we are representing neurons in machine learning today. If our goal is to eventually create systems that reach a general intelligence similar to our own, it helps to thoroughly acknowledge what makes us intelligent.

### Axon
Generally, axons help their neuron transmit signals, namely the action potential previously discussed. They very greatly in length, so greatly that some extend beyond 2 meter within the body... quite a distance when you think of it. In the central nervous system (where all of our information processing takes place), they are typically very thin. Their diameters range between 0.2 micro-meters to 20 micro-meters.

Along the neuron, they begin at what is called the [axon hillock](https://en.wikipedia.org/wiki/Axon_hillock). They are covered by [myelin](https://en.wikipedia.org/wiki/Myelin), also known as the Schwann cell, which is interrupted in small intervals called the [nodes of Ranvier](https://www.ncbi.nlm.nih.gov/books/NBK537273/).

### Presynaptic Axon Terminal

<img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Synapse_Illustration2_tweaked.svg" alt="Drawing" style="width: 500px;"/>

The presynaptic [axon terminals](https://en.wikipedia.org/wiki/Axon_terminal) are at the very end of the axon's branches (also called telodendria),
which are used to send neurotransmitters (covering shortly) to other target cells. They appear as tiny bulbous swellings at the end of many telodendria.

### Synapses

We've talked a bit about neurons and the general idea of how they work, but we haven't talked much about the synapses they make between other neurons.

The neuron from which an action potential signals originate is called a presynaptic neuron, while the target neuron is called a postsynaptic neuron. The neuron-to-neuron connection made between a presynaptic neuron's axon and a postsynaptic neuron's dendrite(s) or cell body is what we call a synapse. They are responsible for the transmission of information between neurons. The connections between a neuron and skeletal [muscle cells](https://en.wikipedia.org/wiki/Myocyte) are called [neuromuscular junctions](https://en.wikipedia.org/wiki/Neuromuscular_junction). Connections between neurons and smooth muscle cells and [glands]((https://en.wikipedia.org/wiki/Gland)) are called [neuroeffector junctions](https://en.wikipedia.org/wiki/Neuroeffector_junction). 

While far from complete, all of the trillions of synapses can look like the following:

<img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/The_Human_Connectome.png" alt="Drawing" style="width: 500px;"/>

Within these synapses and junctions, endogenous chemicals called [neurotransmitters](https://qbi.uq.edu.au/brain/brain-physiology/what-are-neurotransmitters) are transmitted as information carriers. Whenever an action potential is created in a presynaptic neuron's body and sent from its axon to its terminals, these neurotransmitters are released and bind to the postsynaptic neuron's [neuroreceptors](https://en.wikipedia.org/wiki/Neurotransmitter_receptor). This binding of neurotransmitters to neuroreceptors relay an exhibitory or inhibitory signal to the postsynaptic neuron. A neuron may receive and send many input signals from and to multiple neurons, respectively.

I'll conclude this section with a brief disclaimer. I by no means claim to be an expert in biology or neuroscience. I am simply a nerd who loves to learn about these things! If you want a deeper study into a lot of the fundamentals in neuroscience, I highly recommend "Principles of Neural Science" by Kandel, Schwartz, Jessell, Siegelbaum, and Hudspeth. I'm not mentioning this book for any marketing purposes, I just really like the book. A lot of what I covered in this section can be found in it, and much more interesting information.

## Neural Networks within Machine Learning

Now that we understand how much is known about neural networks and their basic units in neuroscience, the next question is what applications have they had in computer science and machine learning. Also, what are their potential applications in the future?

## Knowing Your Data

Before we get into the specifics of neural networks, we first need to understand the data we'll be giving them. While this section could really be made into its own tutorial, it's worth including here if even briefly. If you talk to a lot of data scientists, machine learning practitioner's, and researchers, you'll eventually hear one complain just how much time they have to put into making the data clean and structured for their models. I myself didn't think much about this until I started working with neural networks (and machine learning models in general) in the real world. It can actually get very complicated, and sometimes just not possible to deal with.

Even at times, a lot of companies simply see "machine learning" and want to put any data they have through a model, with little idea how it will work (if at all), only to walk away disappointed. Was it machine learning that failed? Typically not, there are plenty of Kaggle competition results to suggest just how well models can perform. Was it the data scientist or machine learning researcher who simply performed poorly? Could be, but then again it is only becoming easier and easier to make machine learning applications (AutoML being a good example). Then what could it be?! While it typically isn't one thing, it usually revolves around not understanding how real world data is cleaned and structured into model-ready data sets. Hopefully after this section, you'll know how to clean and structure real world data for your models (or if they even can be).

## The Basic Components in Neural Networks: Logistic Regression, Computational Graphs, and Backpropagation

I'm sure you're ready to start understanding how our representations of neural networks are created. The good news is that starts now.

## Shallow Neural Networks

Since we now understand the basic building blocks that make up our representation of neural network, we now turn to creating a full-fledged network. It'll be a basic network, but a neural network nonetheless.

## Deep Neural Networks

Now that we created our first shallow neural network, we're ready to go even deeper (pun intended). This time, we'll create a deep neural network with 5 hidden layers.

## Final Statements

So you made it to the end, with several cups of coffee and naps no doubt. If you came this far and followed everything in this tutorial, you likely learned a lot about neural networks, their inspirations in computer science and machine learning, their underlying mathematics, and how they can be made from scratch. I'll end this tutorial with some of my own personal statements on them and my thoughts on their future.

