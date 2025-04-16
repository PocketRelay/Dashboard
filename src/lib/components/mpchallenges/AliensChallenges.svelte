<script lang="ts">
    import { CHALLENGE_TYPES_ALIENS } from "$lib/data/challenges";
    import { Result } from "postcss";
    import ChallengesList from "./ChallengesList.svelte";
    import { Progress } from "svelte-ux";

    // rawValues values array
    export let rawValues: number[];

    function getPercentage(
        index_current_points: number,
        max_points: number,
    ): number {
        let result =
            Math.round((index_current_points / max_points) * 100) / 100;

        if (result > 1) {
            return 1;
        }

        if (isNaN(result)) {
            return 0;
        }

        return result;
    }

    function getCardClassType(index: number): string {
        if (index == 0) {
            return "card-gold inv-card-silver";
        } else {
            return "card inv-card-silver";
        }
    }

    //Returns a sorted array of challenges based on highest completion percentage.
    function sortByHighestCompletion(masterChallenge: any): any[] {
        let arrayOfTuples: number[][] = [];

        // first calculate percentage for each challenge
        masterChallenge.values.forEach(function (
            challenge: any,
            index: number,
        ) {
            if (index == 0) {
                return;
            }

            let percent = getPercentage(
                rawValues[challenge.index_current_points - 1],
                challenge.max_points,
            );
            arrayOfTuples.push([index, percent]);
        });

        //sort arrayofTuples by percentage in descending order
        arrayOfTuples.sort(function (a, b) {
            return b[1] - a[1];
        });

        //calculate percentage for index 0 and add it to the beginning of the array
        let percent = getPercentage(
            rawValues[masterChallenge.values[0].index_current_points - 1],
            masterChallenge.values[0].max_points,
        );
        arrayOfTuples.unshift([0, percent]);

        console.debug("*** arrayOfTuples: ", arrayOfTuples);

        //Make a copy of masterChallenge.values sorted according to first indexes of arrayOfTuples
        let sortedValues = arrayOfTuples.map(function (tuple) {
            return masterChallenge.values[tuple[0]];
        });

        console.debug("*** sortedValues: ", sortedValues);

        return sortedValues;
    }
</script>

<ChallengesList tabs={CHALLENGE_TYPES_ALIENS} let:selected>
    {#each sortByHighestCompletion(selected) as challenge, i}
        <div class={getCardClassType(i)}>
            <img
                src={`/assets/challenges/${challenge.image}`}
                alt={challenge.name}
                width={512}
                height={128}
            />

            <div class="inv-card__value">
                <h2>{challenge.name}</h2>
                {Math.round(
                    getPercentage(
                        rawValues[challenge.index_current_points - 1],
                        challenge.max_points,
                    ) * 100,
                )}%
                <Progress
                    value={getPercentage(
                        rawValues[challenge.index_current_points - 1],
                        challenge.max_points,
                    )}
                    class="[--color:theme(colors.success)] [--track-color:theme(colors.success/25%)]"
                />
                <span class="annot">
                    <li>
                        {challenge.description}
                    </li>
                    <li>
                        Challenge points: {challenge.challenge_points}
                    </li>
                    <li>
                        Current progress: {rawValues[
                            challenge.index_current_points - 1
                        ]}/{challenge.max_points}
                    </li>
                    <li>
                        Times completed: {challenge.times_completed}
                    </li>
                </span>
            </div>
        </div>
    {/each}
</ChallengesList>
