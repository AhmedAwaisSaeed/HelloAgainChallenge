# Hello Again Challenge

A React Native application that displays and manages rewards using MVVM architecture and Redux for state management.

## Features

- View available rewards
- Collect rewards
- View collected rewards
- Infinite scrolling for rewards list
- Pull to refresh
- Error handling
- Loading states

## Tech Stack

- React Native
- TypeScript
- Redux Toolkit
- React Navigation
- Axios

## Project Structure

```
src/
├── core/
│   ├── api/
│   ├── store/
│   └── types/
├── features/
│   ├── rewards/
│   └── collected-rewards/
├── navigation/
└── shared/
    ├── components/
    ├── hooks/
    ├── utils/
    └── styles/
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- iOS: XCode
- Android: Android Studio

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd HelloAgainChallenge
```

2. Install dependencies:
```bash
yarn install
```

3. Install iOS dependencies:
```bash
cd ios && pod install && cd ..
```

### Running the App

#### iOS
```bash
yarn ios
```

#### Android
```bash
yarn android
```

## Architecture

The project follows MVVM (Model-View-ViewModel) architecture with a feature-based organization:

- **Model**: Represented by the Redux store and API services
- **View**: React Native components in the features directory
- **ViewModel**: Custom hooks that manage the business logic and state

### Key Components

- `RewardCard`: Reusable component for displaying reward information
- `useRewards`: Custom hook that manages rewards data and actions
- `rewardsSlice`: Redux slice for managing collected rewards state
- `rewardsApi`: API service for fetching rewards data

## API

The app uses the Hello Again API to fetch rewards:
```
GET https://staging.helloagain.at/api/v1/clients/5189/bounties/
```

Query parameters:
- `limit`: Number of items per page
- `page`: Page number for pagination
