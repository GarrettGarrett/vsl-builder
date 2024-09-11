const sections = {
  hook: `# Prompt:
  Task: Write a compelling Video Sales Letter (VSL) introduction paragraph based on the following information:
  
 What's the main problem or frustration your target audience faces?:
  {insert answer to question 1}
  
  What's the primary goal or outcome your audience wants to achievee:
  {insert answer to question 2}
  
  Instructions:
  1. Start with a rhetorical question that relates to the main problem.
  2. Acknowledge the audience's frustration using details from the first answer.
  3. Mention the desired outcome from the second answer.
  4. End with a statement about how the audience currently feels, using emotions implied by the first answer.
  
  Tone and style:
  - Conversational and relatable
  - Use "you" to directly address the audience
  - Create a sense of empathy and understanding

  Example: (do not directly copy)
  Have you ever looked at yourself in the mirror and thought, "Wow, I should be further ahead by now"? If you're trying to make money online or start your first business and feel overwhelmed, you're not alone. Every day, you see other people succeeding, and you wonder, "Why am I not succeeding?" Maybe you don't like your job, or you're unfulfilled. You want to do something you love and make money, but you feel stuck, bored, confused, or maybe all three.
  
  Write a 3-4 sentence paragraph that captures the essence of the target audience's frustrations and desires, following the guidelines above. Do not list a statistic or number that is not provided in an answer.`,

  credibility: `Task: Write a paragraph establishing the presenter's credibility and relatability based on the following information:
  
  What are your main qualifications or experiences that make you an expert?:
  {insert answer to question 1}
  
  What notable results or achievements have you accomplished?:
  {insert answer to question 2}
  
  Instructions:
  1. Start with a statement that shows empathy and understanding.
  2. Share your personal experience with the problem, using details from the first answer.
  3. Describe how you overcame the problem and achieved success, using information from the second answer.
  4. End with a transition that leads into your desire to help others.
  
  Tone and style:
  - Authentic and relatable
  - Use "I" statements to share personal experiences
  - Balance humility with impressive achievements

  Example: (do not directly copy)
I get it. I spent years in the exact same spot, afraid to fail, but ashamed of being afraid. And it wasn't until I paid another business owner to teach me how to run a local business that I felt comfortable starting my own. He showed me the ropes and gave me the confidence to start. After scaling my local gym chain from learning this stuff from him, I started a company called Gym Launch, which I sold years later for $46.2 million.  
  
Write a 3-4 sentence paragraph that establishes your credibility and relatability, following the guidelines above. Do not list a statistic or number that is not provided in an answer.`,

  solution: `Task: Write a paragraph introducing the solution based on the following information:
  
  What is the main solution or opportunity you're offering to the audience?:
  {insert answer to question 1}
  
  What unique advantage or method does your solution provide?:
  {insert answer to question 2}
  
  Instructions:
  1. Start with a statement about your desire to help others.
  2. Introduce the main solution or opportunity you're offering.
  3. Highlight the unique advantage or method that sets your solution apart.
  4. End with a brief statement about how easy or accessible your solution is.
  
  Tone and style:
  - Enthusiastic and confident
  - Use "I" and "you" to create a personal connection
  - Emphasize the uniqueness and accessibility of your solution

  Example: (do not directly copy)
  Now, what I want to do is repay the favor. I want to show you the ropes the exact way that business owner did for me. And as the person with the largest community-owned school, which I'll tell you about in a second, I can show you exactly what to do. You can start your own online community business today with all the things I didn't know when I started my first business for free with the school games.

  
  Write a 3-4 sentence paragraph that introduces your solution, following the guidelines above. Do not list a statistic or number that is not provided in an answer.`,

  explanation: `Task: Write a paragraph explaining your product or service based on the following information:
  
  What are the key features or steps of your product/service?:
  {insert answer to question 1}
  
  What makes your product/service easy or accessible for beginners?:
  {insert answer to question 2}
  
  Instructions:
  1. Start with a brief, attention-grabbing statement about your product/service.
  2. Explain the key steps or features in a clear, easy-to-understand manner.
  3. Emphasize how accessible or easy it is for beginners to use.
  4. Provide examples of potential topics or applications to illustrate versatility.
  
  Tone and style:
  - Clear and straightforward
  - Use "you" to directly address the audience
  - Create a sense of simplicity and achievability

  Example: (do not directly copy)
  School games is a fun, easy way to build your online business. No experience or followers needed. Just simply choose a painful experience you overcame, something you find interesting or you're passionate about, or some skill you learned throughout your career. No matter how small. It could be as simple as a better way to organize folders, or meal prepping for kids who have food allergies, or travel hacks. And then all you have to do is just invite people to a community about overcoming that pain, following that passion, or learning that skill. And we'll show you exactly how to build it and monetize it on your first try.
  
  Write a 4-5 sentence paragraph that explains your product or service, following the guidelines above. Do not list a statistic or number that is not provided in an answer.`,

  socialProof: `Task: Write a compelling paragraph showcasing social proof and success stories for a Video Sales Letter (VSL) based on the following information:
  
    What are some impressive success stories from your customers or students?:
  {insert answer to question 1}
  
  What is the key message you want to convey through these success stories?
  {insert answer to question 2}
  
  Instructions:
  1. Start with a statement that introduces the success stories.
  2. Present 4-5 diverse examples from the list (only if the user shared fully), including specific numbers and achievements.
  3. Keep each example brief but impactful.
  4. End with a statement that reinforces the key message about diversity and potential for success.
  
  Tone and style:
  - Enthusiastic and inspiring
  - Use specific names and numbers to add credibility
  - Create a sense of possibility and excitement


  Write a paragraph that showcases social proof and success stories, following the guidelines above. Do not list a statistic or number that is not provided in an answer. Do not give success stories unless specifically answered by the user.`,

  objections: `Task: Write a compelling paragraph addressing objections and building confidence for a Video Sales Letter (VSL) based on the following information:
  
  What is the most impressive statistic about your product/service's success rate?:
  {insert answer to question 1}
  
  How does this statistic address common objections or build confidence?:
  {insert answer to question 2}
  
  Instructions:
  1. Start with a confident statement about the audience's potential for success.
  2. Present the impressive statistic clearly and directly.
  3. Explain what this statistic means in practical terms for the audience.
  4. Use a relatable example to illustrate how this success could impact their life.
  5. End with a statement that reinforces the achievability of success.
  
  Tone and style:
  - Confident and reassuring
  - Use "you" to directly address the audience
  - Create a sense of excitement and possibility

  Example: (do not directly copy)
  And here's the thing. You can become one of these success stories. You want to know why I say that so confidently? Because 54.1% of people who started a paid community in school make money. Yes, you heard that right. More than one out of two people who start a paid community in school make money. That means, by your next reunion, instead of answering, "What are you up to these days?" You could be answering, "How'd you do that?" And, "Could you help me?" And the thing is, you probably could because it's not that hard.
  
  Write a 4-5 sentence paragraph that addresses objections and builds confidence, following the guidelines above. Do not list a statistic or number that is not provided in an answer.`,

  analogy: `Task: Write a paragraph that simplifies the concept of your product/service using an analogy or metaphor based on the following information:
  
  What analogy or metaphor can you use to explain your product/service in simple terms?:
  {insert answer to question 1}
  
  How does this analogy help explain the key aspects of your product/service?:
  {insert answer to question 2}
  
  Instructions:
  1. Introduce the analogy or metaphor.
  2. Explain how different elements of the analogy correspond to aspects of your product/service.
  3. Use the analogy to highlight the simplicity and effectiveness of your offering.
  4. End with a statement that ties the analogy back to the potential for success.
  
  Tone and style:
  - Conversational and easy to understand
  - Use vivid imagery to make the analogy relatable
  - Create a sense of "aha!" moment for the audience

  Example: (do not directly copy)
  So think about a paid community like this. It's kind of like an online party. When people go to a party, it's not the host that makes the party. It's the other people at the party. The host just invites the guests, provides the place to meet, and sets the rules for the party. And since it's your party, you can make the place seem whatever you want, and invite whoever you want. And when the party rocks, you get all the credit, even though you just put it together. And when the doorman collects the money to let people in, it all goes to you.

  
  Write a 4-5 sentence paragraph that simplifies your concept using an analogy or metaphor, following the guidelines above. Do not list a statistic or number that is not provided in an answer.`,

  urgency: `Task: Write a paragraph that creates a sense of urgency and FOMO (Fear of Missing Out) for a Video Sales Letter (VSL) based on the following information:
  
  What current trend or market condition makes your offer timely and urgent?:
  {insert answer to question 1}
  
 What potential consequence of not taking action now can you highlight?:
  {insert answer to question 2}
  
  Instructions:
  1. Start with a statement that highlights the current trend or market condition.
  2. Use specific examples or numbers to illustrate the trend's significance.
  3. Explain how this trend relates to the audience's potential for success.
  4. Emphasize the potential consequences of not taking action now.
  5. End with a call to action that encourages immediate consideration.
  
  Tone and style:
  - Urgent and compelling
  - Use present tense to create immediacy
  - Create a sense of excitement and opportunity

  Example: (do not directly copy)
  Right now, people are paying hundreds, sometimes thousands, to get into digital communities the same way they do nightclubs or cafes. Just think about it as a place where lots of people who want to talk about the same stuff can gather together, and people pay to get in. And the crazy thing is, people are selling courses and coaching programs for thousands, and tens of thousands, on how to build a business like this, because it's so profitable.
  
  Write a 4-5 sentence paragraph that creates urgency and FOMO, following the guidelines above. Do not list a statistic or number that is not provided in an answer.`,

  uniqueSelling: `Task: Write a paragraph that highlights your unique selling proposition (USP) for a Video Sales Letter (VSL) based on the following information:
  
  What is your main unique selling proposition (USP)?:
  {insert answer to question 1}
  
  How does your USP differentiate you from competitors?:
  {insert answer to question 2}
  
  Instructions:
  1. Start with a question that challenges the status quo or common alternatives.
  2. Introduce your unique selling proposition clearly and concisely.
  3. Explain how your USP addresses the audience's needs better than alternatives.
  4. Highlight the specific benefits or advantages of your approach.
  5. End with a statement that reinforces the uniqueness and value of your offering.
  
  Tone and style:
  - Confident and persuasive
  - Use comparisons to highlight your advantages
  - Create a sense of exclusivity or innovation

  Example: (do not directly copy)
  But what if there were a faster, easier, zero-risk way to learn how to do this for yourself? What if you could learn how to start, scale, and monetize an online group the right way, on your first try, for free? Would you at least consider it?
  
  Write a 4-5 sentence paragraph that highlights your unique selling proposition, following the guidelines above. Do not list a statistic or number that is not provided in an answer.`,

  obstacles: `Task: Write a paragraph that addresses common obstacles and concerns for a Video Sales Letter (VSL) based on the following information:
  
  What are the main obstacles that prevent people from succeeding in online businesses?:
  {insert answer to question 1}
  
  How does your product/service help overcome these obstacles?:
  {insert answer to question 2}
  
  Instructions:
  1. Start by acknowledging the audience's interest in your offer.
  2. Mention the common obstacles that prevent success in online businesses.
  3. Explain how your product/service is designed to overcome these obstacles.
  4. Highlight the high success rate of your offering.
  5. End with a statement that reinforces the effectiveness of your solution.
  
  Tone and style:
  - Empathetic and reassuring
  - Use "we" to create a sense of partnership
  - Emphasize the problem-solving nature of your offer

  Example: (do not directly copy)
Interested yet? Good. Because school games was designed to smash through every obstacle that once stood in the way of starting an online business. It's why we have such an insanely high success rate. We've obsessed for years about removing everything that stops people from succeeding. And that's why with the school games, you can succeed without an audience or expertise. Because, let's face it, most people don't. And so we had to figure out a way to help people win.
  
  Write a 4-5 sentence paragraph that addresses obstacles and concerns, following the guidelines above. Do not list a statistic or number that is not provided in an answer.`,

  process: `Task: Write a paragraph that explains the process and benefits of your program for a Video Sales Letter (VSL) based on the following information:
  
  What are the key steps or milestones in your program?:
  {insert answer to question 1}
  
  "What ongoing benefits or opportunities does your program offer?:
  {insert answer to question 2}
  
  Instructions:
  1. Start by posing a question about what happens after signing up.
  2. Outline the key steps or milestones in your program.
  3. Highlight the exciting rewards or opportunities for success.
  4. Mention the ongoing benefits and chances for growth.
  5. End with a statement that emphasizes the potential for success and celebration.
  
  Tone and style:
  - Exciting and motivational
  - Use future tense to create anticipation
  - Paint a vivid picture of success and achievement

  Example: (do not directly copy)
  So what happens if you sign up right now? Well, you'll follow our process, you'll build a paid community about whatever it is you love. And if you become one of the top 10 communities on the leaderboard, you'll join me and other successful community owners here in Vegas. Even if you don't win the first month, you get to keep competing every month until you win. And then you can join all the alumni and all the past winners to get to the next level.
  
  Write a 4-5 sentence paragraph that explains the process and benefits, following the guidelines above. Never list a statistic or number that is not provided in an answer.`,

  guarantee: `Task: Write a paragraph that highlights your risk reversal or guarantee for a Video Sales Letter (VSL) based on the following information:
  
  What guarantee or risk reversal do you offer to potential customers?:
  {insert answer to question 1}
  
  How does this guarantee address potential concerns or hesitations?:
  {insert answer to question 2}
  
  Instructions:
  1. Start by acknowledging that taking action is the only way to achieve results.
  2. Mention the potential rewards of joining your program.
  3. Introduce your guarantee or risk reversal offer.
  4. Explain how the guarantee removes any financial risk for the customer.
  5. End with a statement that reinforces your commitment to customer success.
  
  Tone and style:
  - Confident and reassuring
  - Use direct language to address potential concerns
  - Emphasize the low-risk, high-reward nature of your offer

    Example: (do not directly copy)
    Remember, the only guarantee is that if you don't take the shot, you'll stay exactly where you are. But if you do, you could be the next one coming out to Vegas celebrating how quickly you built an online business with consistent monthly recurring revenue.

  
  Write a 4-5 sentence paragraph that highlights your risk reversal or guarantee, following the guidelines above. Never list a statistic or number that is not provided in an answer.`,

  callToAction: `Task: Write a concluding paragraph with a strong call to action for a Video Sales Letter (VSL) based on the following information:
  
  What specific action do you want the viewer to take after watching the VSL?:
  {insert answer to question 1}
  
  What unique or time-sensitive offer can you provide to encourage immediate action?:
  {insert answer to question 2}
  
    Instructions:
    1. Start with a clear and direct call to action, referencing the desired action.
    2. Mention any time-sensitive or exclusive offers (e.g., personal onboarding).
    3. Address potential concerns with a guarantee or risk reversal.
    4. Emphasize the ease of getting started and the support available.
    5. End with a final, encouraging statement that reinforces your commitment to their success.

    Tone and style:
    - Urgent and motivational
    - Use a mix of short and longer sentences for rhythm
    - Create a sense of personal connection and support
    - Be realistic, do not over promise anything.
    - speak at a 3rd grade reading level.

  Example: (do not directly copy)
  If you're in, click the button below to join the school games now. If you join this month, I'll personally onboard you live. Sign up, and I'll see you on our onboarding call on Monday. You can ask me whatever you want. Now, if you're worried about starting a free trial, we offer an unconditional money-back guarantee. So if you finish your trial and you forget to cancel, just let us know and we'll refund you. Alright, we just want people to win.
  
  Write a 2-3 sentence paragraph with a strong call to action, following the guidelines above. Never list a statistic or number that is not provided in an answer. `,
};

export default sections;
