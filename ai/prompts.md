# AI Evaluation Prompts for Recycling Production Line Manager

## Overview
This document defines the AI evaluation criteria and prompts used to assess candidates for the Recycling Production Line Manager position. The evaluation focuses on three core competencies critical to the role.

## Evaluation Criteria

### 1. Crisis Management (40% weight)
**Focus**: Immediate safety protocols, understaffed logistics, emergency response

**Assessment Areas**:
- Safety protocol implementation during emergencies
- Decision-making under pressure
- Resource allocation during staffing shortages
- Equipment failure response
- Hazardous material incident management

**Sample Prompt**:
```
Evaluate the candidate's crisis management capabilities based on their experience and skills.
Consider:
- Years of experience in high-pressure environments
- Safety compliance certifications (OSHA, etc.)
- Track record of handling emergencies
- Leadership during critical incidents
Score from 0-100 with emphasis on proactive vs reactive approaches.
```

**Feedback Guidelines**:
- **90-100**: Exceptional proactive safety protocols, demonstrated leadership in multiple crisis scenarios
- **80-89**: Strong crisis response, good technical grasp of safety regulations, slightly reactive
- **60-79**: Average crisis management, solid foundation but needs more hands-on experience
- **Below 60**: Insufficient experience or reactive approach to emergencies

---

### 2. Sustainability Expertise (30% weight)
**Focus**: Waste stream optimization, ISO 14001 compliance, environmental regulations

**Assessment Areas**:
- Knowledge of ISO 14001 standards
- Waste stream analysis and optimization
- Recycling process improvements
- Lean manufacturing principles
- Environmental impact reduction strategies

**Sample Prompt**:
```
Assess the candidate's sustainability expertise and environmental management capabilities.
Consider:
- ISO 14001 certification or equivalent
- Experience with waste management systems
- Process optimization achievements
- Knowledge of recycling industry standards
Score from 0-100 emphasizing practical implementation over theoretical knowledge.
```

**Feedback Guidelines**:
- **90-100**: Deep waste-stream optimization knowledge, proven ISO 14001 implementation
- **80-89**: Strong sustainability background, good process optimization skills
- **60-79**: Basic sustainability knowledge, requires more specialized training
- **Below 60**: Limited environmental management experience

---

### 3. Team Motivation (30% weight)
**Focus**: Conflict resolution in high-stress shifts, team leadership, employee engagement

**Assessment Areas**:
- Leadership style and effectiveness
- Conflict resolution capabilities
- Communication skills
- Employee retention strategies
- Performance management
- Shift coordination

**Sample Prompt**:
```
Evaluate the candidate's team leadership and motivation capabilities.
Consider:
- Years of team leadership experience
- Conflict resolution examples
- Communication effectiveness
- Track record of team performance improvements
Score from 0-100 with focus on high-stress environment management.
```

**Feedback Guidelines**:
- **90-100**: Exceptional leadership, proven conflict resolution, high team performance
- **80-89**: Strong team leadership, effective communication, good motivation strategies
- **60-79**: Average leadership skills, basic conflict management
- **Below 60**: Limited team leadership experience

---

## Overall Scoring Formula

```
Overall Score = (Crisis Management × 0.40) + (Sustainability × 0.30) + (Team Motivation × 0.30)
```

### Score Interpretation:
- **90+**: Exceptional candidate - Immediate hire recommendation
- **80-89**: Strong candidate - Good fit with minor development areas
- **70-79**: Average candidate - Acceptable with training support
- **60-69**: Below average - Requires significant development
- **Below 60**: Not recommended for this role

---

## Mock AI Implementation

The current system uses template-based feedback for performance and cost optimization:

```typescript
function mockAIEvaluation() {
  const crisisScore = Math.floor(Math.random() * 41) + 60; 
  const sustainabilityScore = Math.floor(Math.random() * 41) + 60;
  const motivationScore = Math.floor(Math.random() * 41) + 60;
  
  const overallScore = (crisisScore * 0.4) + (sustainabilityScore * 0.3) + (motivationScore * 0.3);
  
  // Template-based feedback based on score ranges
}
```

### Future Enhancement Options:
1. **Integration with LLM APIs** (GPT-4, Claude, etc.) for dynamic evaluations
2. **Natural language processing** of candidate resumes and cover letters
3. **Structured interviews** with AI-generated questions
4. **Skills assessment tests** with automated scoring
5. **Reference check automation** with sentiment analysis

---

## Assumptions & Tradeoffs

### Assumptions:
- Candidates have varying levels of experience (1-15 years)
- All evaluated candidates meet minimum qualifications
- Scoring is relative within the candidate pool
- Focus on practical experience over certifications

### Tradeoffs:
- **Template-based feedback** reduces API costs but limits evaluation depth
- **Random score generation** in mock mode for demonstration purposes
- **No actual AI integration** to keep the system self-contained
- **Fixed scoring weights** - real implementation might adjust based on organizational priorities

---

## Skills Taxonomy

Relevant skills for the Recycling Production Line Manager role:

**Safety & Compliance**:
- Safety Compliance
- OSHA Standards
- Hazardous Material Handling
- ISO 14001

**Technical Operations**:
- Waste Management
- Lean Manufacturing
- Process Optimization
- Equipment Maintenance
- Quality Control

**Leadership & Management**:
- Team Leadership
- Supply Chain Management
- Data Analysis

---

## Usage in Application

The AI evaluation is triggered when:
1. User clicks "Evaluate" on a candidate profile
2. System generates scores for the three core competencies
3. Weighted overall score is calculated
4. Feedback is generated based on score ranges
5. Rankings are automatically updated across all candidates

Location in codebase: `server/routes.ts` - `mockAIEvaluation()` function
