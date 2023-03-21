/** @format */

/**
 * Utility function for the kMeans algorithm
 */

const deduplicate = (arr: unknown[]) => {
    const map = new Map();
    arr.forEach((e) => map.set(JSON.stringify(e), e));
    return [...map.values()];
};

/**
 * To calculate the centroid of a cluster, the average of the values
 * inside the cluster is calculated, then the entry closest to
 * the found average is returned as mean.
 */

const calculateCentroid = <T extends number[]>(cluster: T[], dataset: T[]): T => {
    // initialize sums as an empty rgb array
    const sums: number[] = Array(3).fill(0);

    cluster.forEach((entry) => {
        if (!Array.isArray(entry)) return;
        entry.forEach((value, index) => {
            sums[index] += value;
        });
    });

    /**
     * The average centroid is a value that might not exist inside the dataset, but can
     * be used to find the closest entry inside the dataset and return that as centroid instead
     */

    const averageCentroid = sums.map((sum) => Math.abs(sum / cluster.length));

    let meanCentroid: T = averageCentroid as T;
    let minDistance = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < dataset.length; i++) {
        const entry = dataset[i];
        // initialise the minimal found distance as practically infinitely big.
        const distance = euclideanDistance<T>(entry, averageCentroid as T);

        if (distance < minDistance) {
            minDistance = distance;
            meanCentroid = dataset[i];
        }
    }

    return meanCentroid;
};

// check if two given tuples are equal
const areEqual = <T extends number[]>(origin: T, compare: T) => {
    return origin.length === compare.length && origin.every((val, i) => val === compare[i]);
};

// calculate distance between two tuples
const euclideanDistance = <T extends number[]>(origin: T, destination: T) => {
    return Math.sqrt(origin.map((val, i) => Math.pow(+val - +destination[i], 2)).reduce((a, b) => a + b));
};

/**
 * @description
 * Basic generic kMeans algorithm implementation
 * The algorithm finds K number of groups in a ungrouped generic set of entries T by selecting K random
 * entries as 'Centroids'. Each entry is associated with the 'Centroid' closest to the entry.
 * After iterating each entry, all groups are evaluated for their mean value, which then becomes the new
 * 'Centroid'. The algorithm completes once the centroids do not change.
 */

export const kMeans = <T extends number[]>(dataset: T[], k: number): T[][] => {
    let iterationCount = 0;

    // the converged boolean describes if the centroids are settled or still moving
    let converged: boolean = false;

    /**
     * In the initialization step, the centroids and clusters are created.
     * K amount of centroids are randomly selected from the provided dataset.
     * K amount of empty clusters are created.
     */
    let centroids: T[] = [...deduplicate(dataset.sort(() => 0.5 - Math.random()))].slice(0, k);
    let clusters: T[][] = Array(k).fill([]);

    if (k > centroids.length) {
        throw new RangeError(
            `Found not enough unique entries to produce sufficiently random centroids. (K: ${k}, unique: ${centroids.length})`
        );
    }

    /**
     * Iterate the dataset until all centroids are settled.
     * To ensure finite number of executions, the dataset is iterated
     * recursively.
     */

    const evaluateDataset = () => {
        clusters = Array(k).fill([]);

        /**
         * Iterate each entry in the data set and check it's distance to each centroid.
         * Then push the entry to the cluster which index corresponds to the closest centroid found.
         */

        for (let i = 0; i < dataset.length; i++) {
            const entry = dataset[i];
            let closestClusterIndex = 0;

            // initialise the minimal found distance as practically infinitely big.
            let minDistance = Number.MAX_SAFE_INTEGER;

            /**
             * Iterate over each centroid and check the distance between the centroid and
             * the entry. The found distance is compared against the set minDistance variable.
             * If a new minDistance is found, minDistance and the closestClusterIndex is updated.
             */
            for (let j = 0; j < k; j++) {
                const distance = euclideanDistance<T>(entry, centroids[j]);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestClusterIndex = j;
                }
            }
            // Push the entry to the closest cluster.
            clusters[closestClusterIndex] = [...clusters[closestClusterIndex], entry];
        }

        converged = true;
        for (let i = 0; i < centroids.length; i++) {
            const newCentroid = calculateCentroid(clusters[i], dataset);

            if (!areEqual(newCentroid, centroids[i])) {
                centroids[i] = newCentroid;
                converged = false;
            }
        }

        if (!converged && iterationCount < 100) {
            iterationCount++;

            evaluateDataset();
        }
    };

    // start the recursive evaluation
    evaluateDataset();
    return clusters;
};
