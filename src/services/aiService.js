// Simple AI service that generates content ideas
// In a real app, you would connect to an AI API

export async function generateContentIdeas(topic, platform, count = 5) {
  // This is a mock function that simulates API calls to an AI service
  // In a real application, you would call an actual AI API here

  // Basic templates for different platforms
  const templates = {
    Instagram: [
      "10 stunning photos of {topic} that will inspire your followers",
      "How to create perfect {topic} flatlay for Instagram",
      "Behind the scenes of my {topic} photoshoot",
      "5 creative ways to showcase {topic} in your Instagram Stories",
      "Trending {topic} hashtags to grow your Instagram following",
      "{topic} carousel post ideas that drive engagement",
      "My {topic} morning routine - perfect for Reels",
      "User-generated content ideas around {topic}",
      "Collaborate with other {topic} influencers with these ideas",
      "Transform your {topic} content with these editing tips"
    ],
    TikTok: [
      "3 viral {topic} trends to jump on this week",
      "How to turn your {topic} knowledge into TikTok gold",
      "Day in the life of a {topic} enthusiast - perfect TikTok format",
      "Beginner's guide to {topic} - educational series idea",
      "{topic} hacks that will blow your followers' minds",
      "React to {topic} content from other creators",
      "Transform your {topic} routine with this 15-second tip",
      "POV: You're a {topic} expert helping a beginner",
      "3 transitions to showcase your {topic} before and after",
      "Use this sound to highlight your {topic} collection"
    ],
    YouTube: [
      "Ultimate guide to {topic} - in-depth tutorial",
      "{topic} review: honest thoughts after 30 days",
      "I tried {topic} for a week and here's what happened",
      "10 things I wish I knew before starting with {topic}",
      "Budget vs. luxury {topic}: Is it worth the price difference?",
      "How to make money with {topic} - complete guide",
      "{topic} Q&A: Answering your most asked questions",
      "My {topic} equipment/tools: complete breakdown",
      "Comparing the top 5 {topic} products/services",
      "Beginner to expert: {topic} roadmap video series"
    ],
    Twitter: [
      "Daily {topic} tips thread idea",
      "5 controversial opinions about {topic}",
      "How to explain {topic} in 280 characters",
      "I'll be sharing my {topic} journey - tweet series",
      "Ask me anything about {topic} - engagement tweet",
      "Breaking news in the {topic} industry - how to leverage it",
      "My top 10 {topic} resources (one per tweet)",
      "Before/after {topic} results - visual tweet",
      "Common myths about {topic} debunked",
      "Poll idea: What's your biggest {topic} challenge?"
    ]
  };

  // Default to Instagram templates if platform not found
  const platformTemplates = templates[platform] || templates.Instagram;

  // Replace {topic} with actual topic in selected templates
  return Promise.resolve(
    platformTemplates
      .slice(0, count)
      .map(template => template.replace(/{topic}/g, topic))
  );
}